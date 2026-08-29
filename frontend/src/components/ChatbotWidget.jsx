import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { sendChatMessage } from '../services/chatService';
import '../styles/ChatbotWidget.css';

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    sender: 'assistant',
    text: `Namaste! 🙏 I am your 24/7 First-Aid Assistant.\nHow can I help you today?\n\nनमस्ते! मैं आपका प्राथमिक चिकित्सा सहायक हूँ। आप मुझसे किसी भी आपातकालीन प्राथमिक उपचार के बारे में पूछ सकते हैं।`,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

const QUICK_CHIPS = [
  { label: '🐍 Snake Bite / सांप का काटना', query: 'What to do for a snake bite?' },
  { label: '🩸 Heavy Bleeding / खून बहना', query: 'How to stop severe bleeding?' },
  { label: '❤️‍🩹 Chest Pain / सीने में दर्द', query: 'First aid for chest pain emergency' },
  { label: '🫁 CPR Instructions', query: 'CPR steps for unconscious person' },
  { label: '🔥 Burns / जल जाना', query: 'First aid steps for skin burn' }
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText.trim();
    if (!query || isLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(updatedMessages);
      
      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response.reply,
        category: response.category,
        source: response.source,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: '⚠️ Network connection issue. Please dial 112 directly for urgent emergencies.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN'; // Default to Hindi/English voice recognition in India
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setInputText(transcript);
        handleSendMessage(transcript);
      }
    };

    recognition.start();
  };

  return (
    <div className="chatbot-root no-print">
      {/* Collapsible Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header__title">
              <span style={{ fontSize: '1.4rem' }}>🏥</span>
              <div>
                <span className="chatbot-header__name">SwasthyaSetu AI Assistant</span>
                <span className="chatbot-header__subtitle">24/7 Rural Emergency Guidance</span>
              </div>
            </div>
            <div className="chatbot-header__actions">
              <a href="tel:112" className="chatbot-header__emergency" title="Emergency Speed Dial">
                📞 112
              </a>
              <button 
                className="chatbot-header__close" 
                onClick={() => setIsOpen(false)} 
                aria-label="Close Chatbot"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`chatbot-msg chatbot-msg--${msg.sender}`}
              >
                <div className="chatbot-msg__bubble">
                  {msg.text}

                  {msg.category && (
                    <div style={{ marginTop: '8px' }}>
                      <Link 
                        to={`/first-aid/${msg.category}`} 
                        className="chatbot-msg__category-link"
                        onClick={() => setIsOpen(false)}
                      >
                        📖 View Full Guide &amp; Videos →
                      </Link>
                    </div>
                  )}
                </div>
                <div className="chatbot-msg__meta">{msg.time}</div>
              </div>
            ))}

            {isLoading && (
              <div className="chatbot-msg chatbot-msg--assistant">
                <div className="chatbot-typing">
                  <div className="chatbot-typing__dot"></div>
                  <div className="chatbot-typing__dot"></div>
                  <div className="chatbot-typing__dot"></div>
                </div>
              </div>
            )}

            {/* Quick Action Suggestion Chips */}
            {!isLoading && messages.length <= 4 && (
              <div className="chatbot-chips">
                {QUICK_CHIPS.map((chip, i) => (
                  <button 
                    key={i} 
                    className="chatbot-chip"
                    onClick={() => handleSendMessage(chip.query)}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="chatbot-footer">
            <form 
              className="chatbot-input-form" 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            >
              <input
                ref={inputRef}
                type="text"
                className="chatbot-input"
                placeholder="Ask first-aid question / सवाल पूछें..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                type="button"
                className={`chatbot-mic-btn ${isListening ? 'chatbot-mic-btn--listening' : ''}`}
                onClick={handleVoiceInput}
                title="Voice input"
              >
                🎤
              </button>
              <button
                type="submit"
                className="chatbot-send-btn"
                disabled={!inputText.trim() || isLoading}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          className="chatbot-trigger is-pulsing"
          onClick={() => setIsOpen(true)}
          aria-label="Open Medical Assistant Chatbot"
        >
          <span className="chatbot-trigger__icon">💬</span>
          <span>First-Aid Assistant</span>
          {unreadCount > 0 && (
            <span className="chatbot-trigger__badge">{unreadCount}</span>
          )}
        </button>
      )}
    </div>
  );
}

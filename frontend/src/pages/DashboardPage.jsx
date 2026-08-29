import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchDashboardStats } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Cpu, Database, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import '../styles/DashboardPage.css';

function formatUptime(seconds) {
  if (!seconds && seconds !== 0) return '—';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function formatCategoryName(cat) {
  return cat.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function DashboardPage() {
  const { t, language } = useLanguage();
  const hi = language === 'hi';

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetchDashboardStats();
        if (res?.success && res.stats) setStats(res.stats);
      } catch (err) {
        console.error('[Dashboard Load Error]', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return <LoadingSpinner message={hi ? 'आँकड़े लोड हो रहे हैं...' : 'Loading figures...'} />;
  }

  if (!stats) {
    return (
      <div className="page stack">
        <h1>{t('dashboard.title')}</h1>
        <p className="notice">
          {hi
            ? 'आँकड़े नहीं मिल पाए — सर्वर से संपर्क नहीं हुआ।'
            : 'No figures available — could not reach the server.'}
        </p>
      </div>
    );
  }

  const topCategories = stats.topCategories || [];
  const maxCount = topCategories[0]?.count || 1;
  const status = stats.systemStatus || {};

  const statusRows = [
    {
      icon: Cpu,
      name: t('dashboard.aiService'),
      value: status.ai === 'active' ? 'Gemini' : (hi ? 'नियम-आधारित' : 'Keyword fallback'),
      idle: status.ai !== 'active'
    },
    {
      icon: Database,
      name: t('dashboard.database'),
      value: (status.database === 'sqlite' || status.database === 'connected')
        ? (hi ? 'SQLite (स्थानीय डेटाबेस)' : 'SQLite (Local DB)')
        : (hi ? 'मेमोरी में' : 'In-memory'),
      idle: status.database !== 'sqlite' && status.database !== 'connected'
    },
    {
      icon: ShieldCheck,
      name: hi ? 'सुरक्षा नियम' : 'Safety rules',
      value: hi ? 'चालू' : 'Active'
    },
    {
      icon: Clock,
      name: t('dashboard.uptime'),
      value: formatUptime(status.uptime)
    }
  ];

  return (
    <div className="page page--wide stack">
      <div className="dash__head">
        <h1>{t('dashboard.title')}</h1>
        <p className="dash__sub">
          {hi
            ? 'कुल मिलाकर उपयोग के आँकड़े। किसी का नाम या लक्षण यहाँ नहीं रखे जाते।'
            : 'Aggregate usage only. No names or symptom text is kept here.'}
        </p>
      </div>

      <div className="dash__tiles">
        <div className="dash__tile">
          <span className="dash__tile-label">{t('dashboard.totalSessions')}</span>
          <span className="dash__tile-value">{stats.totalSessions}</span>
          <span className="dash__tile-note">
            {stats.demoSessions} {hi ? 'नमूने' : 'demo'}
          </span>
        </div>

        <div className="dash__tile">
          <span className="dash__tile-label">{t('dashboard.last24h')}</span>
          <span className="dash__tile-value dash__tile-value--alert">{stats.last24Hours}</span>
          <span className="dash__tile-note">{hi ? 'पिछले दिन' : 'Past day'}</span>
        </div>

        <div className="dash__tile">
          <span className="dash__tile-label">{t('dashboard.last7d')}</span>
          <span className="dash__tile-value">{stats.last7Days}</span>
          <span className="dash__tile-note">{hi ? 'पिछले हफ़्ते' : 'Past week'}</span>
        </div>

        <div className="dash__tile">
          <span className="dash__tile-label">{hi ? 'गंभीर' : 'Critical'}</span>
          <span className="dash__tile-value dash__tile-value--alert">
            {stats.severityDistribution?.critical || 0}
          </span>
          <span className="dash__tile-note">{hi ? '112 सुझाया गया' : 'Advised to call 112'}</span>
        </div>
      </div>

      <div className="dash__cols">
        <section className="card">
          <h2>{t('dashboard.topCategories')}</h2>

          <div className="dash__bars">
            {topCategories.map((item) => (
              <div key={item.category}>
                <div className="dash__bar-row">
                  <span>{formatCategoryName(item.category)}</span>
                  <span className="dash__bar-count">{item.count}</span>
                </div>
                <div className="dash__track">
                  <div className="dash__fill" style={{ width: `${(item.count / maxCount) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h2>{t('dashboard.systemStatus')}</h2>

          <div className="dash__status">
            {statusRows.map(({ icon: Icon, name, value, idle }) => (
              <div key={name} className="dash__status-row">
                <span className="dash__status-name">
                  <Icon size={16} />
                  {name}
                </span>
                <span className={`dash__status-value${idle ? ' dash__status-value--idle' : ''}`}>
                  {!idle && <CheckCircle2 size={14} />}
                  {value}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

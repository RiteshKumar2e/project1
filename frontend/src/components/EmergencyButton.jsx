import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export default function EmergencyButton({
  label,
  sublabel,
  icon: Icon = AlertTriangle,
  variant = 'emergency',
  onClick,
  href,
  pulse = false
}) {
  const variants = {
    emergency: 'action--alert',
    call: 'action--alert',
    primary: 'action--solid',
    plain: 'action--plain'
  };

  const cls = `action ${variants[variant] || 'action--plain'}${pulse ? ' is-pulsing' : ''}`;

  const inner = (
    <>
      <Icon size={32} />
      <span className="action__body">
        <span className="action__label">{label}</span>
        {sublabel && <span className="action__note">{sublabel}</span>}
      </span>
      <ArrowRight size={24} />
    </>
  );

  return href
    ? <a href={href} className={cls}>{inner}</a>
    : <button type="button" onClick={onClick} className={cls}>{inner}</button>;
}

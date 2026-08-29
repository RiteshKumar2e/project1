/**
 * EmergencySession Model (Sequelize / SQLite)
 * 
 * Stores anonymous emergency session telemetry for aggregate statistics.
 * NOTE: Patient descriptions or personal identifying data are NOT stored.
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const EmergencySession = sequelize.define('EmergencySession', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  severity: {
    type: DataTypes.ENUM('critical', 'urgent', 'less_urgent'),
    allowNull: false,
  },
  source: {
    type: DataTypes.ENUM('ai', 'keyword_fallback', 'demo'),
    defaultValue: 'ai',
  },
  isDemo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'emergency_sessions',
  timestamps: false, // We use our own timestamp column
  indexes: [
    { fields: ['category'] },
    { fields: ['timestamp'] },
    { fields: ['severity'] }
  ]
});

module.exports = EmergencySession;

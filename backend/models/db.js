/**
 * Local SQLite Database Connection via Sequelize ORM
 */

const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbStoragePath = process.env.SQLITE_DB_PATH || process.env.DATABASE_STORAGE || path.join(dataDir, 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbStoragePath,
  logging: false
});

let isInitialized = false;

async function initDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    isInitialized = true;
    console.log(`✅ Connected to local SQLite DB at: ${dbStoragePath}\n`);
    return true;
  } catch (error) {
    console.error(`⚠️  SQLite connection failed: ${error.message}`);
    console.log('   Continuing with in-memory storage.\n');
    isInitialized = false;
    return false;
  }
}

function isDBConnected() {
  return isInitialized;
}

module.exports = {
  sequelize,
  initDB,
  isDBConnected,
  dbStoragePath
};

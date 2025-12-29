import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing database schema...');

    // Read schema file
    const schemaPath = join(__dirname, '../schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');

    // Execute schema
    await pool.query(schema);

    console.log('✓ Database schema created successfully');

    // Create default admin user
    const bcrypt = await import('bcryptjs');
    const defaultPassword = await bcrypt.hash('admin123', 10);

    await pool.query(`
      INSERT INTO users (email, password_hash, first_name, last_name, role)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (email) DO NOTHING
    `, ['admin@bmhc.org', defaultPassword, 'BMHC', 'Administrator', 'admin']);

    console.log('✓ Default admin user created (email: admin@bmhc.org, password: admin123)');
    console.log('🎉 Database initialization complete!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();

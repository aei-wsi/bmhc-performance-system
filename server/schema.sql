-- BMHC Performance Management System Database Schema

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'supervisor', 'contractor')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contractors table
CREATE TABLE IF NOT EXISTS contractors (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(200) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  contract_type VARCHAR(50) CHECK (contract_type IN ('full-time', 'part-time', 'contract')),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'terminated')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contract obligations table
CREATE TABLE IF NOT EXISTS obligations (
  id SERIAL PRIMARY KEY,
  contractor_id INTEGER REFERENCES contractors(id) ON DELETE CASCADE,
  clause TEXT NOT NULL,
  frequency VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- KPIs table
CREATE TABLE IF NOT EXISTS kpis (
  id SERIAL PRIMARY KEY,
  obligation_id INTEGER REFERENCES obligations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  target DECIMAL(10, 2) NOT NULL,
  actual DECIMAL(10, 2) DEFAULT 0,
  percentage DECIMAL(5, 2) DEFAULT 0,
  status VARCHAR(50) CHECK (status IN ('exceeds', 'meeting', 'needs-improvement', 'non-compliant')),
  evidence TEXT,
  trend VARCHAR(50) CHECK (trend IN ('improving', 'stable', 'declining')),
  measurement_period_start DATE NOT NULL,
  measurement_period_end DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  contractor_id INTEGER REFERENCES contractors(id) ON DELETE CASCADE,
  reviewer_id INTEGER REFERENCES users(id),
  review_period_start DATE NOT NULL,
  review_period_end DATE NOT NULL,
  supervisor_notes TEXT,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'finalized', 'archived')),
  generated_pdf_path VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Review sections (links reviews to specific KPIs)
CREATE TABLE IF NOT EXISTS review_sections (
  id SERIAL PRIMARY KEY,
  review_id INTEGER REFERENCES reviews(id) ON DELETE CASCADE,
  kpi_id INTEGER REFERENCES kpis(id) ON DELETE CASCADE,
  assessment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contract documents table
CREATE TABLE IF NOT EXISTS contract_documents (
  id SERIAL PRIMARY KEY,
  contractor_id INTEGER REFERENCES contractors(id) ON DELETE CASCADE,
  file_name VARCHAR(500) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  extracted_text TEXT,
  uploaded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contractors_user_id ON contractors(user_id);
CREATE INDEX IF NOT EXISTS idx_contractors_status ON contractors(status);
CREATE INDEX IF NOT EXISTS idx_obligations_contractor_id ON obligations(contractor_id);
CREATE INDEX IF NOT EXISTS idx_kpis_obligation_id ON kpis(obligation_id);
CREATE INDEX IF NOT EXISTS idx_kpis_status ON kpis(status);
CREATE INDEX IF NOT EXISTS idx_reviews_contractor_id ON reviews(contractor_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_review_sections_review_id ON review_sections(review_id);
CREATE INDEX IF NOT EXISTS idx_contract_documents_contractor_id ON contract_documents(contractor_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contractors_updated_at BEFORE UPDATE ON contractors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_obligations_updated_at BEFORE UPDATE ON obligations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kpis_updated_at BEFORE UPDATE ON kpis
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update job table structure
ALTER TABLE job
  DROP COLUMN type,
  DROP COLUMN requirement,
  ADD COLUMN tags VARCHAR(255) AFTER job_title,
  ADD COLUMN job_role VARCHAR(100) NOT NULL AFTER tags,
  ADD COLUMN min_salary DECIMAL(12,2) AFTER job_role,
  ADD COLUMN max_salary DECIMAL(12,2) AFTER min_salary,
  ADD COLUMN vacancies INT NOT NULL DEFAULT 1 AFTER max_salary,
  ADD COLUMN job_level VARCHAR(50) NOT NULL AFTER vacancies,
  ADD COLUMN country VARCHAR(100) NOT NULL AFTER job_level,
  ADD COLUMN city VARCHAR(100) NOT NULL AFTER country,
  ADD COLUMN job_type VARCHAR(50) NOT NULL AFTER city,
  ADD COLUMN job_description TEXT NOT NULL AFTER job_type,
  ADD COLUMN posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER job_description,
  ADD COLUMN is_active BOOLEAN DEFAULT TRUE AFTER posted_date;

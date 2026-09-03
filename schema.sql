CREATE TABLE IF NOT EXISTS posters (
    id SERIAL PRIMARY KEY,
    title VARCHAR(180) NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL DEFAULT '19:00',
    location VARCHAR(180) NOT NULL,
    category VARCHAR(80) NOT NULL DEFAULT 'Практика',
    image_url TEXT NOT NULL,
    registration_url TEXT,
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO posters (title, description, event_date, event_time, location, category, image_url, registration_url)
SELECT 'Голос, который слышно', 'Практикум по уверенной подаче, интонации и работе с волнением.', '2026-09-18', '19:00', 'Алматы · Talan Towers', 'Практика', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=85', '#'
WHERE NOT EXISTS (SELECT 1 FROM posters);

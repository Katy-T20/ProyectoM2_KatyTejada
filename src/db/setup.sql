CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL, 
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

INSERT INTO authors (name, email, bio) VALUES
  ('Ana García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),
  ('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico especializado en bases de datos'),
  ('María López', 'maria@example.com', 'Ingeniera de software con foco en APIs REST');

INSERT INTO posts (title, content, author_id, published) VALUES
  ('Introducción a Node.js', 'Node.js es un runtime de JavaScript...', 5, true),
  ('PostgreSQL vs MySQL', 'Ambas bases de datos tienen ventajas...', 5, true),
  ('APIs RESTful', 'REST es un estilo arquitectónico...', 5, true),
  ('Manejo de errores en Express', 'El manejo apropiado de errores...', 7, false),
  ('Async/Await explicado', 'Las promesas simplifican el código asíncrono...', 5, false);
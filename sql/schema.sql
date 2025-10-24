
CREATE TABLE IF NOT EXISTS categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE,
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS metas (
  id SERIAL PRIMARY KEY,
  categoria_id INT NOT NULL,
  valor_limite DECIMAL(10, 2) NOT NULL,
  mes INT NOT NULL,  
  ano INT NOT NULL,
  
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  

  CONSTRAINT fk_categoria
    FOREIGN KEY(categoria_id) 
    REFERENCES categorias(id)
    ON DELETE CASCADE 
);

CREATE TABLE IF NOT EXISTS transacoes (
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  data DATE NOT NULL,
  categoria_id INT NOT NULL,

  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
 
  CONSTRAINT fk_categoria_transacao
    FOREIGN KEY(categoria_id) 
    REFERENCES categorias(id)
    ON DELETE RESTRICT
);


INSERT INTO categorias (nome, descricao) 
VALUES 
  ('Alimentação', 'Gastos com mercado e restaurantes'),
  ('Transporte', 'Gastos com combustível, Uber, ônibus'),
  ('Lazer', 'Cinema, streaming, passeios')
ON CONFLICT (nome) DO NOTHING; 

INSERT INTO transacoes (descricao, valor, data, categoria_id)
VALUES
  ('Almoço no restaurante', 45.50, '2025-10-22', 1),
  ('Gasolina', 150.00, '2025-10-21', 2),
  ('Ingresso Cinema', 30.00, '2025-10-23', 3);

INSERT INTO metas (categoria_id, valor_limite, mes, ano)
VALUES
  (1, 800.00, 10, 2025); 

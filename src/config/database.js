require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER, // Lê DB_USER do .env
  host: process.env.DB_HOST, // Lê DB_HOST do .env
  database: process.env.DB_NAME, // Lê DB_NAME do .env
  password: process.env.DB_PASSWORD, // Lê DB_PASSWORD do .env
  port: parseInt(process.env.DB_PORT), // Lê DB_PORT e converte para número
});

pool.connect((erro, client, release) => {
  if (erro) {
    console.error("❌ Erro ao con+ectar ao PostgreSQL:", erro.message);
    console.error("💡 Verifique suas credenciais no arquivo .env");
  } else {
    console.log("✅ Conectado ao PostgreSQL!");
    console.log(`📊 Banco: ${process.env.DB_NAME}`);
    console.log(`🏠 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    release();
  }
});

const criarTabela = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS clientes (
      id_        SERIAL PRIMARY KEY,
      nome       VARCHAR(25)   NOT NULL,
      cpf        VARCHAR(15)  NOT NULL,
      telefone   VARCHAR(30) NOT NULL,
      email      VARCHAR(30) NOT NULL,
      datanasc   DATE NOT NULL,
      rua VARCHAR(50) NOT NULL,
      numeroCasa INT NOT NULL,
      bairro VARCHAR(30) NOT NULL
    )
  `;

  try {
    await pool.query(sql);
    console.log("✅ Tabela clientes verificada/criada");
  } catch (erro) {
    console.error("❌ Erro ao criar tabela:", erro.message);
  }
};

criarTabela();

module.exports = pool;

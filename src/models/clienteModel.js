// Importar o pool de conexões do PostgreSQL
const pool = require('../config/database');

// ============================================================
// FUNÇÃO: listarTodos
// ============================================================

async function listarTodos() {
  const result = await pool.query(
    'SELECT id_ AS id, nome, cpf, telefone, email FROM clientes ORDER BY id_'
  );

  return result.rows;
}

// ============================================================
// FUNÇÃO: buscarPorId
// ============================================================
async function buscarPorId(id) {
  const result = await pool.query(
    'SELECT id_ AS id, nome, cpf, telefone, email FROM clientes WHERE id_ = $1',
    [id]
  );

  return result.rows[0];
}

// ============================================================
// FUNÇÃO: criar
// ============================================================
async function criar(dados) {
  const {nome ,cpf, telefone, email} = dados;
  

  const sql = `
    INSERT INTO clientes (nome, cpf, telefone, email)
    VALUES ($1, $2, $3, $4)
    RETURNING id_ AS id, nome, cpf, telefone, email
  `;

  const result = await pool.query(
    sql,
    [nome, cpf, telefone, email]
  );
  

  return result.rows[0];
}

// ============================================================
// FUNÇÃO: atualizar
// ============================================================
async function atualizar(id, dados) {
  const {nome ,cpf, telefone, email} = dados;
  
 
  const sql = `
    UPDATE clientes
    SET nome = $1, cpf = $2, telefone = $3, email = $4
    WHERE id_ = $5
    RETURNING id_ AS id, nome, cpf, telefone, email
  `;

  const result = await pool.query(
    sql,
    [nome, cpf, telefone, email, id]
  );
  
  // Se não atualizou nenhuma linha, retorna null
  return result.rows[0] || null;
}

// ============================================================
// FUNÇÃO: deletar
// ============================================================
async function deletar(id_) {
  const result = await pool.query(
    'DELETE FROM clientes WHERE id_ = $1',
    [id_]
  );
  
  // rowCount indica quantas linhas foram afetadas
  // Se for > 0, significa que deletou algo
  return result.rowCount > 0;
}

// ============================================================
// FUNÇÃO: buscarPorNome
// ============================================================
async function buscarPorNome(nome) {
  const result = await pool.query(
    'SELECT id_ AS id, nome, cpf, telefone, email FROM clientes WHERE nome ILIKE $1',
    [`%${nome}%`]
  );

  return result.rows;
}

// ============================================================
// EXPORTAR TODAS AS FUNÇÕES
// ============================================================
module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorNome,
};

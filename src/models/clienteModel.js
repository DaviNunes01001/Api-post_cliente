// Importar o pool de conexões do PostgreSQL
const pool = require('../config/database');

// ============================================================
// FUNÇÃO: listarTodos
// ============================================================

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM clientes ORDER BY id_'
  );
  

  return result.rows;
}

// ============================================================
// FUNÇÃO: buscarPorId
// ============================================================
async function buscarPorId(id) {
  const result = await pool.query(
    'SELECT * FROM clientes WHERE id_ = $1',
    [id]  
  );
  

  return result.rows[0];
}

// ============================================================
// FUNÇÃO: criar
// ============================================================
async function criar(dados) {
  const {nome ,cpf, telefone, email, datanasc, rua, numeroCasa, bairro} = dados;
  

  const sql = `
    INSERT INTO clientes (nome ,cpf, telefone, email, datanasc, rua, numeroCasa, bairro)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;

  const result = await pool.query(
    sql,
    [nome ,cpf, telefone, email, datanasc, rua, numeroCasa, bairro]
  );
  

  return result.rows[0];
}

// ============================================================
// FUNÇÃO: atualizar
// ============================================================
async function atualizar(id, dados) {
  const {nome ,cpf, telefone, email, datanasc, rua, numeroCasa, bairro} = dados;
  
 
  const sql = `
    UPDATE clientes
    SET nome = $1, cpf = $2, telefone = $3, email = $4, datanasc = $5, rua = $6, numeroCasa = $7, bairro = $8
    WHERE id_ = $9
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome ,cpf, telefone, email, datanasc, rua, numeroCasa, bairro, id]
  );
  
  // Se não atualizou nenhuma linha, retorna null
  return result.rows[0] || null;
}

// ============================================================
// FUNÇÃO: deletar
// ============================================================
async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM clientes WHERE id_ = $1',
    [id]
  );
  
  // rowCount indica quantas linhas foram afetadas
  // Se for > 0, significa que deletou algo
  return result.rowCount > 0;
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
};

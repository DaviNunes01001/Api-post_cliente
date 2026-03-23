const ClienteModel = require("../models/clienteModel");

// ============================================================
// LISTAR TODOS
// ============================================================
async function listarTodos(req, res) {
  try {
    const clientes = await ClienteModel.listarTodos();
    res.status(200).json(clientes);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar clientes",
      erro: erro.message,
    });
  }
}

// ============================================================
// BUSCAR POR ID
// ============================================================
async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: "ID inválido",
      });
    }

    const cliente = await ClienteModel.buscarPorId(id);

    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({
        mensagem: `cliente de id:${id} não encontrado`,
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar cliente",
      erro: erro.message,
    });
  }
}

// ============================================================
// CRIAR
// ============================================================
async function criar(req, res) {
  try {
    const { nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro } =
      req.body;

    if (
      !nome ||
      !cpf ||
      !telefone ||
      !email ||
      !datanasc ||
      !rua ||
      numeroCasa == null || // ✅ corrigido
      !bairro
    ) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios",
      });
    }

    if (parseInt(numeroCasa) <= 0) { // ✅ simplificado
      return res.status(400).json({
        mensagem: "O numero da casa deve ser maior que 0",
      });
    }

    const novoCliente = await ClienteModel.criar({
      nome,
      cpf,
      telefone,
      email,
      datanasc,
      rua,
      numeroCasa,
      bairro,
    });

    res.status(201).json(novoCliente);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao criar novo cliente",
      erro: erro.message,
    });
  }
}

// ============================================================
// ATUALIZAR
// ============================================================
async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro } =
      req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: "ID inválido",
      });
    }

    if (
      !nome ||
      !cpf ||
      !telefone ||
      !email ||
      !datanasc ||
      !rua ||
      numeroCasa == null || // ✅ corrigido
      !bairro
    ) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios",
      });
    }

    if (parseInt(numeroCasa) <= 0) { // ✅ adicionado (evita erro)
      return res.status(400).json({
        mensagem: "O numero da casa deve ser maior que 0",
      });
    }

    const ClienteAtualizado = await ClienteModel.atualizar(id, {
      nome,
      cpf,
      telefone,
      email,
      datanasc,
      rua,
      numeroCasa,
      bairro,
    });

    if (ClienteAtualizado) {
      res.status(200).json(ClienteAtualizado);
    } else {
      res.status(404).json({
        mensagem: `Cliente ${id} não encontrado`,
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao atualizar cliente",
      erro: erro.message,
    });
  }
}

// ============================================================
// DELETAR
// ============================================================
async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: "ID inválido",
      });
    }

    const deletado = await ClienteModel.deletar(id);

    if (deletado) {
      res.status(200).json({
        mensagem: `Cliente ${id} removido com sucesso`,
      });
    } else {
      res.status(404).json({
        mensagem: `Cliente ${id} não encontrado`,
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao deletar Cliente",
      erro: erro.message,
    });
  }
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};
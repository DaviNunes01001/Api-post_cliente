const ClienteModel = require("../models/clienteModel");

// ============================================================
// LISTAR TODOS OS CLIENTES
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
// BUSCAR CLIENTE POR ID
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
        mensagem: `Cliente de ID ${id} não encontrado`,
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
// BUSCAR CLIENTES POR NOME
// ============================================================
async function buscarPorNome(req, res) {
  try {
    const nome = req.params.nome;

    if (!nome) {
      return res.status(400).json({
        mensagem: "Nome é obrigatório",
      });
    }

    const clientes = await ClienteModel.buscarPorNome(nome);

    if (clientes.length > 0) {
      res.status(200).json(clientes);
    } else {
      res.status(404).json({
        mensagem: `Nenhum cliente encontrado com nome: ${nome}`,
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar cliente por nome",
      erro: erro.message,
    });
  }
}

// ============================================================
// CRIAR NOVO CLIENTE
// ============================================================
async function criar(req, res) {
  try {
    const { nome, cpf, telefone, email } = req.body;

    if (!nome || !cpf || !telefone || !email) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios",
      });
    }

    const novoCliente = await ClienteModel.criar({
      nome,
      cpf,
      telefone,
      email,
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
// ATUALIZAR CLIENTE
// ============================================================
async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nome, cpf, telefone, email } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: "ID inválido",
      });
    }

    if (!nome || !cpf || !telefone || !email) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios",
      });
    }

    const clienteAtualizado = await ClienteModel.atualizar(id, {
      nome,
      cpf,
      telefone,
      email,
    });

    if (clienteAtualizado) {
      res.status(200).json(clienteAtualizado);
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
// DELETAR CLIENTE
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
      mensagem: "Erro ao deletar cliente",
      erro: erro.message,
    });
  }
}

// ============================================================
// EXPORTAR TODAS AS FUNÇÕES
// ============================================================
module.exports = {
  listarTodos,
  buscarPorId,
  buscarPorNome,
  criar,
  atualizar,
  deletar,
};
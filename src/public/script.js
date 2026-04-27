// ========================================
// VARIÁVEIS GLOBAIS
// ========================================

let clienteEmEdicao = null; // Guarda o ID do cliente que está sendo editado (null = modo criação)

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

// Mostra uma mensagem modal
function mostrarMensagem(mensagem, tipo = 'info') { // Recebe texto e tipo (info, sucesso, erro)
    const modal = document.getElementById('modalMessage'); // Pega o elemento do modal
    const modalText = document.getElementById('modalText'); // Pega o texto do modal
    
    modalText.textContent = mensagem; // Define a mensagem
    modal.style.display = 'flex'; // Mostra o modal
    
    // Define a cor baseado no tipo
    if (tipo === 'sucesso') {
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Cor para sucesso
    } else if (tipo === 'erro') {
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Cor para erro (igual ao sucesso aqui)
    }
}

// Fecha o modal de mensagens
function fecharModal() {
    document.getElementById('modalMessage').style.display = 'none'; // Esconde o modal
}

// Limpa o formulário
function limparFormulario() {
    document.getElementById('clientForm').reset(); // Reseta todos os campos do form
    clienteEmEdicao = null; // Volta para modo criação
    document.querySelector('.form-section h2').textContent = 'Adicionar ou Editar Cliente'; // Atualiza título
}

// Formata CPF para exibição
function formatarCPF(cpf) {
    if (!cpf) return ''; // Se vazio, retorna string vazia
    // (\d{3}) - Grupo de captura que captura exatamente 3 dígitos
    // A regex divide o CPF em 4 grupos: 3 dígitos, 3 dígitos, 3 dígitos e 2 dígitos
    // O padrão $1.$2.$3-$4 reconstrói como: XXX.XXX.XXX-XX
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Aplica formatação
}

// Formata telefone para exibição
function formatarTelefone(telefone) {
    if (!telefone) return ''; // Se vazio, retorna vazio
    return telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3'); // Formata como (XX) XXXXX-XXXX
}

// ========================================
// OPERAÇÕES COM A API
// ========================================

// Busca todos os clientes
async function carregarClientes() {
    const loadingMessage = document.getElementById('loadingMessage'); // Elemento de loading
    const emptyMessage = document.getElementById('emptyMessage'); // Mensagem de vazio
    const clientsList = document.getElementById('clientsList'); // Container da tabela
    
    loadingMessage.style.display = 'block'; // Mostra loading
    clientsList.innerHTML = ''; // Limpa lista
    
    try {
        const resposta = await fetch('/clientes'); // Faz requisição GET
        
        if (!resposta.ok) { // Se erro HTTP
            throw new Error('Erro ao buscar clientes'); // Lança erro
        }
        
        const clientes = await resposta.json(); // Converte resposta para JSON
        loadingMessage.style.display = 'none'; // Esconde loading
        
        if (clientes.length === 0) { // Se lista vazia
            emptyMessage.style.display = 'block'; // Mostra mensagem
            clientsList.innerHTML = ''; // Garante lista vazia
        } else {
            emptyMessage.style.display = 'none'; // Esconde mensagem
            exibirTabela(clientes); // Mostra tabela
        }
    } catch (erro) {
        loadingMessage.style.display = 'none'; // Esconde loading
        emptyMessage.style.display = 'block'; // Mostra erro
        console.error('Erro:', erro); // Log no console
        mostrarMensagem('Erro ao carregegar os clientes. Tente novamente.', 'erro'); // Feedback pro usuário
    }
}

// Cria um novo cliente
async function criarCliente(dados) {
    try {
        const resposta = await fetch('/clientes', { // POST para API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Diz que envia JSON
            },
            body: JSON.stringify(dados) // Converte objeto para JSON
        });
        
        if (!resposta.ok) { // Se erro HTTP
            const erro = await resposta.json(); // Pega erro da API
            throw new Error(erro.error || 'Erro ao criar cliente'); // Lança erro
        }
        
        const novoCliente = await resposta.json(); // Recebe cliente criado
        mostrarMensagem('Cliente cadastrado com sucesso!', 'sucesso'); // Feedback
        limparFormulario(); // Limpa form
        carregarClientes(); // Atualiza lista
        
    } catch (erro) {
        console.error('Erro:', erro); // Log
        mostrarMensagem('Erro: ' + erro.message, 'erro'); // Feedback
    }
}

// Atualiza um cliente
async function atualizarCliente(id, dados) {
    try {
        const resposta = await fetch(`/clientes/${id}`, { // PUT com ID
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.error || 'Erro ao atualizar cliente');
        }
        
        const clienteAtualizado = await resposta.json(); // Cliente atualizado
        mostrarMensagem('Cliente atualizado com sucesso!', 'sucesso');
        limparFormulario();
        carregarClientes();
        
    } catch (erro) {
        console.error('Erro:', erro);
        mostrarMensagem('Erro: ' + erro.message, 'erro');
    }
}

// Deleta um cliente
async function deletarCliente(id) {
    if (!confirm('Tem certeza que deseja deletar este cliente?')) { // Confirmação
        return; // Cancela se usuário negar
    }
    
    try {
        const resposta = await fetch(`/clientes/${id}`, { // DELETE
            method: 'DELETE'
        });
        
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.error || 'Erro ao deletar cliente');
        }
        
        mostrarMensagem('Cliente removido com sucesso!', 'sucesso');
        carregarClientes(); // Atualiza lista
        
    } catch (erro) {
        console.error('Erro:', erro);
        mostrarMensagem('Erro: ' + erro.message, 'erro');
    }
}

// ========================================
// EXIBIÇÃO DE DADOS
// ========================================

// Exibe a tabela de clientes
function exibirTabela(clientes) {
    const clientsList = document.getElementById('clientsList'); // Container
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    clientes.forEach(cliente => { // Percorre lista
        html += `
            <tr>
                <td>#${cliente.id}</td> <!-- ID -->
                <td>${cliente.nome}</td> <!-- Nome -->
                <td>${formatarCPF(cliente.cpf)}</td> <!-- CPF formatado -->
                <td>${cliente.email}</td> <!-- Email -->
                <td>${formatarTelefone(cliente.telefone)}</td> <!-- Telefone -->
                <td class="acoes">
                    <button class="btn btn-edit" onclick="editarCliente(${cliente.id}, '${cliente.nome}', '${cliente.cpf}', '${cliente.email}', '${cliente.telefone}')">✏️ Editar</button> <!-- Botão editar -->
                    <button class="btn btn-danger" onclick="deletarCliente(${cliente.id})">🗑️ Deletar</button> <!-- Botão deletar -->
                </td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    clientsList.innerHTML = html; // Injeta HTML na página
}

// Carrega os dados do cliente no formulário para edição
function editarCliente(id, nome, cpf, email, telefone) {
    clienteEmEdicao = id; // Define que está editando
    
    document.getElementById('nome').value = nome; // Preenche nome
    document.getElementById('cpf').value = cpf; // Preenche CPF
    document.getElementById('email').value = email; // Preenche email
    document.getElementById('telefone').value = telefone; // Preenche telefone
    
    document.querySelector('.form-section h2').textContent = `Editando Cliente #${id}`; // Atualiza título
    
    // Scroll até o formulário
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' }); // Leva usuário até form
}

// ========================================
// BUSCA E FILTRO
// ========================================

// Busca clientes no backend
async function buscarClientes(tipo, valor) {
    const loadingMessage = document.getElementById('loadingMessage');
    const emptyMessage = document.getElementById('emptyMessage');
    const clientsList = document.getElementById('clientsList');
   
    loadingMessage.style.display = 'block'; // Mostra loading
    clientsList.innerHTML = ''; // Limpa lista
   
    try {
        let url = ''; // URL dinâmica

            if (tipo === 'nome') {
            url = `/clientes/nome/${encodeURIComponent(valor)}`; // Busca por nome (encode evita erro em URL)
        } else if (tipo === 'id') {
            url = `/clientes/${valor}`; // Busca por ID
        }

        const resposta = await fetch(url); // Requisição
       
        if (!resposta.ok) {
            throw new Error('Erro ao buscar clientes');
        }
       
        let clientes = await resposta.json(); // Resultado

        if (!Array.isArray(clientes)) { // Garante que é array
            clientes = clientes ? [clientes] : []; // Converte objeto único em array
        }

        loadingMessage.style.display = 'none';
       
        if (clientes.length === 0) {
            emptyMessage.style.display = 'block';
            clientsList.innerHTML = '';
        } else {
            emptyMessage.style.display = 'none';
            exibirTabela(clientes);
        }
    } catch (erro) {
        loadingMessage.style.display = 'none';
        emptyMessage.style.display = 'block';
        console.error('Erro:', erro);
        mostrarMensagem('Erro ao buscar os clientes. Tente novamente.', 'erro');
    }
}

// Filtra clientes pela busca (agora busca no backend)
function filtrarClientes() {
    const searchInput = document.getElementById('searchInput'); // Input texto
    const searchType = document.getElementById('searchType'); // Tipo (nome/id)
    const valor = searchInput.value.trim(); // Remove espaços
    
    if (valor === '') {
        // Se vazio, carrega todos
        carregarClientes();
    } else {
        // Busca no backend
        buscarClientes(searchType.value, valor);
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', function() { // Quando DOM carregar
    // Carrega os clientes ao abrir a página
    carregarClientes();
    
    // Formulário de envio
    document.getElementById('clientForm').addEventListener('submit', async function(e) {
        e.preventDefault(); // Impede reload da página
        
        const nome = document.getElementById('nome').value.trim(); // Pega nome
        const cpf = document.getElementById('cpf').value.trim(); // CPF
        const email = document.getElementById('email').value.trim(); // Email
        const telefone = document.getElementById('telefone').value.trim(); // Telefone
        
        // Validação básica
        if (!nome || !cpf || !email || !telefone) { // Se algum vazio
            mostrarMensagem('Por favor, preencha todos os campos!', 'erro');
            return;
        }
        
        const dados = { nome, cpf, email, telefone }; // Objeto
        
        if (clienteEmEdicao) { // Se está editando
            atualizarCliente(clienteEmEdicao, dados);
        } else {
            criarCliente(dados); // Senão, cria novo
        }
    });
    
    // Botão Limpar Formulário
    document.getElementById('btnLimpar').addEventListener('click', limparFormulario);
    
    // Botão Recarregar Lista
    document.getElementById('btnRecarregar').addEventListener('click', carregarClientes);
    
    // Botão Buscar
    document.getElementById('btnBuscar').addEventListener('click', filtrarClientes);
    
    // Busca em tempo real (opcional, pode ser removido se quiser apenas botão)
    document.getElementById('searchInput').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') { // Se pressionar Enter
            filtrarClientes();
        }
    });
    
    // Fechar modal ao clicar fora
    document.getElementById('modalMessage').addEventListener('click', function(e) {
        if (e.target === this) { // Se clicou fora do conteúdo
            fecharModal();
        }
    });
});
# 📋 API de Clientes com PostgreSQL

Sistema completo de gerenciamento de clientes desenvolvido com **Express.js** e **PostgreSQL**.

## ✨ Funcionalidades

- ✅ Listar todos os clientes
- ✅ Buscar cliente por ID
- ✅ Buscar clientes por nome
- ✅ Criar novo cliente
- ✅ Atualizar dados do cliente
- ✅ Deletar cliente
- ✅ Interface web responsiva

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- PostgreSQL instalado e rodando
- npm ou yarn

## 🚀 Instalação

### 1. Clonar o repositório

```bash
git clone <seu-repositorio>
cd Api-post_cliente
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Criar arquivo `.env` na raiz do projeto:

```env
PORT=3000
NODE_ENV=development

DB_USER=postgres
DB_HOST=localhost
DB_NAME=API-CLIENTES
DB_PASSWORD=senai
DB_PORT=5433
```

### 4. Criar tabela no PostgreSQL

Execute o arquivo `database.sql` no PostgreSQL:

```sql
-- Dentro do psql ou pgAdmin
\i database.sql
```

Ou copie e execute o conteúdo do arquivo `database.sql` direto no banco.

### 5. Iniciar o servidor

```bash
npm start
```

O servidor estará rodando em: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
Api-post_cliente/
├── app.js                          # Arquivo principal da aplicação
├── package.json                    # Dependências do projeto
├── .env                            # Variáveis de ambiente
├── database.sql                    # Script SQL para criar tabelas
├── src/
│   ├── config/
│   │   └── database.js            # Configuração do PostgreSQL
│   ├── controllers/
│   │   └── clienteController.js   # Lógica das requisições
│   ├── models/
│   │   └── clienteModel.js        # Operações com banco de dados
│   ├── routes/
│   │   └── clienteRoutes.js       # Definição das rotas
│   └── public/
│       ├── index.html             # Página principal
│       ├── script.js              # JavaScript da interface
│       └── style.css              # Estilos da página
└── README.md                       # Este arquivo
```

## 🔌 Endpoints da API

### GET - Listar todos os clientes

```
GET /clientes
```

Retorna: Array com todos os clientes

### GET - Buscar cliente por ID

```
GET /clientes/:id
```

**Parâmetros:**
- `id` (number): ID do cliente

**Retorna:** Objeto do cliente encontrado

### GET - Buscar clientes por nome

```
GET /clientes/nome/:nome
```

**Parâmetros:**
- `nome` (string): Nome do cliente (busca parcial)

**Retorna:** Array de clientes que correspondem ao nome

### POST - Criar novo cliente

```
POST /clientes
Content-Type: application/json

{
  "nome": "João Silva",
  "cpf": "12345678901",
  "telefone": "(11) 98765-4321",
  "email": "joao@email.com"
}
```

**Retorna:** Objeto do cliente criado

### PUT - Atualizar cliente

```
PUT /clientes/:id
Content-Type: application/json

{
  "nome": "João Silva",
  "cpf": "12345678901",
  "telefone": "(11) 98765-4321",
  "email": "joao@email.com"
}
```

**Retorna:** Objeto do cliente atualizado

### DELETE - Deletar cliente

```
DELETE /clientes/:id
```

**Retorna:** Mensagem de confirmação

## 💻 Como Usar a Interface

1. **Abra o navegador** e acesse: `http://localhost:3000`

2. **Adicionar Cliente:**
   - Preencha o formulário com os dados
   - Clique em "Salvar Cliente"

3. **Listar Clientes:**
   - Clique no botão "Recarregar Lista"
   - Todos os clientes serão exibidos em uma tabela

4. **Buscar Cliente:**
   - Escolha o tipo de busca (Nome ou ID)
   - Digite o valor desejado
   - Clique em "Buscar"

5. **Editar Cliente:**
   - Na tabela, clique no botão "✏️ Editar"
   - Formulário será preenchido com os dados
   - Modifique conforme necessário
   - Clique em "Salvar Cliente"

6. **Deletar Cliente:**
   - Na tabela, clique no botão "🗑️ Deletar"
   - Confirme a ação
   - Cliente será removido da base de dados

## 🛠️ Tecnologias Utilizadas

- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados
- **Node.js** - Runtime JavaScript
- **HTML5** - Markup
- **CSS3** - Estilos
- **JavaScript Vanilla** - Interatividade

## 📝 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| PORT | Porta do servidor | 3000 |
| NODE_ENV | Ambiente (development/production) | development |
| DB_USER | Usuário PostgreSQL | postgres |
| DB_HOST | Host do banco de dados | localhost |
| DB_NAME | Nome do banco de dados | API-CLIENTES |
| DB_PASSWORD | Senha do banco de dados | senai |
| DB_PORT | Porta do PostgreSQL | 5433 |

## 🐛 Solução de Problemas

### Erro: "Erro ao conectar ao PostgreSQL"

**Solução:** Verifique se:
- PostgreSQL está rodando
- As credenciais no `.env` estão corretas
- O banco de dados `API-CLIENTES` existe

### Erro: "Porta já está em uso"

**Solução:** Altere a porta no arquivo `.env`:
```env
PORT=3001
```

### Tabela não encontrada

**Solução:** Execute o arquivo `database.sql` para criar a tabela:
```bash
psql -U postgres -d API-CLIENTES -f database.sql
```

## 📧 Contato

Para dúvidas ou sugestões, entre em contato.

---

**Desenvolvido para aprendizado em Desenvolvimento de Sistemas** ✨

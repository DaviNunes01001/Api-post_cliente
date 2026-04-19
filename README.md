# 📦 API Post Cliente

API simples para cadastro de clientes utilizando requisições HTTP (POST).

## 🚀 Funcionalidades

* Criar cliente (POST)
* Receber dados via JSON
* Estrutura básica de API REST

## 🛠️ Tecnologias

* Node.js
* JavaScript
* (Provável) Express

## 📁 Estrutura (esperada)

```
/project
 ├── src/
 │    ├── routes/
 │    ├── controllers/
 │    └── app.js
 ├── package.json
 └── README.md
```

## ▶️ Como rodar

1. Clonar o repositório:

```bash
git clone https://github.com/DaviNunes01001/Api-post_cliente.git
```

2. Entrar na pasta:

```bash
cd Api-post_cliente
```

3. Instalar dependências:

```bash
npm install
```

4. Rodar o servidor:

```bash
npm run dev
```

ou

```bash
node index.js
```

## 📡 Endpoint

### Criar cliente

**POST** `/clientes`

#### Body (JSON)

```json
{
  "nome": "João",
  "email": "joao@email.com",
  "idade": 25
}
```

#### Resposta (exemplo)

```json
{
  "message": "Cliente criado com sucesso"
}
```

## ⚠️ Possíveis melhorias

* Validação de dados (ex: email válido)
* Banco de dados (MongoDB, PostgreSQL)
* CRUD completo (GET, PUT, DELETE)
* Tratamento de erros mais robusto

## 📄 Licença

Uso educacional.

---

# MedCore System

Sistema Integrado de Gestão Hospitalar desenvolvido para a disciplina de Tecnologias para Internet.

## Descrição

O MedCore System é uma aplicação Full Stack inspirada em sistemas hospitalares utilizados para gerenciamento de pacientes, profissionais, especialidades e atendimentos.

A aplicação foi desenvolvida utilizando React no frontend, Node.js e Express no backend e MySQL como banco de dados relacional.

---

## Tecnologias Utilizadas

### Frontend

* React
* Vite
* React Router DOM
* Axios

### Backend

* Node.js
* Express
* MySQL2
* CORS
* Dotenv

### Banco de Dados

* MySQL

### Ferramentas

* VS Code
* Git
* GitHub
* MySQL Workbench
* Postman

---

## Funcionalidades

### Dashboard

* Total de pacientes cadastrados
* Total de profissionais cadastrados
* Total de especialidades cadastradas
* Total de atendimentos cadastrados

### Pacientes

* Cadastro de pacientes
* Listagem de pacientes
* Edição de pacientes
* Exclusão de pacientes

### Profissionais

* Cadastro de profissionais
* Listagem de profissionais
* Edição de profissionais
* Exclusão de profissionais
* Relacionamento com especialidades

### Especialidades

* Cadastro de especialidades
* Listagem de especialidades
* Edição de especialidades
* Exclusão de especialidades

### Atendimentos

* Cadastro de atendimentos
* Listagem de atendimentos
* Edição de atendimentos
* Exclusão de atendimentos
* Relacionamento entre pacientes e profissionais

---

## Estrutura do Projeto

SistemaHospitalar/

├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── componentes/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── .gitignore
│
├── .gitignore
└── README.md

---

## Como Executar o Projeto

### Backend

```bash
cd backend
npm install
npm start
```

Backend disponível em:

```text
http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend disponível em:

```text
http://localhost:5173
```

---

## Banco de Dados

Banco de dados MySQL utilizado:

```text
medcore_db
```

Principais tabelas:

* pacientes
* profissionais
* especialidades
* atendimentos

---

## API REST

### Pacientes

```http
GET    /pacientes
GET    /pacientes/:id
POST   /pacientes
PUT    /pacientes/:id
DELETE /pacientes/:id
```

### Profissionais

```http
GET    /profissionais
GET    /profissionais/:id
POST   /profissionais
PUT    /profissionais/:id
DELETE /profissionais/:id
```

### Especialidades

```http
GET    /especialidades
GET    /especialidades/:id
POST   /especialidades
PUT    /especialidades/:id
DELETE /especialidades/:id
```

### Atendimentos

```http
GET    /atendimentos
GET    /atendimentos/:id
POST   /atendimentos
PUT    /atendimentos/:id
DELETE /atendimentos/:id
```

---

## Autor

Vinicius Soares e Kendra Suamy

Projeto acadêmico desenvolvido para a disciplina de Tecnologias para Internet.


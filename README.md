# 📋 TaskManager - Full Stack Task Management Application

![.NET 8](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge\&logo=dotnet\&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL%20Server-2022-CC2927?style=for-the-badge\&logo=microsoft-sql-server\&logoColor=white)

# 📌 Sobre o Projeto

TaskManager é uma aplicação Full Stack para gerenciamento de tarefas desenvolvida utilizando ASP.NET Core Web API e React.

O projeto foi criado com o objetivo de praticar conceitos utilizados no mercado de desenvolvimento de software, incluindo:

* Arquitetura em camadas
* ASP.NET Identity
* Autenticação com JWT
* Entity Framework Core
* SQL Server
* React com TypeScript
* Dependency Injection
* Boas práticas de organização de código

---

# ✨ Funcionalidades

## 🔐 Autenticação

* ✅ Registro de usuários
* ✅ Login com JWT
* ✅ ASP.NET Identity
* ✅ Controle de acesso por usuário autenticado

## 📝 Gerenciamento de Tarefas

* ✅ Criar tarefas
* ✅ Listar tarefas
* ✅ Editar tarefas
* ✅ Excluir tarefas
* ✅ Marcar tarefas como concluídas

## 🏗️ Arquitetura

* ✅ Separação em camadas (Application e Infrastructure)
* ✅ Services e Interfaces
* ✅ DTOs organizados por funcionalidade
* ✅ Injeção de Dependência
* ✅ Entity Framework Core (Code First)

---

# 🛠️ Tecnologias Utilizadas

## Backend

* ASP.NET Core 8
* Entity Framework Core 8
* ASP.NET Identity
* JWT Authentication
* SQL Server

## Frontend

* React
* TypeScript
* Axios

---

# 📂 Estrutura do Projeto

```text
TaskManager
│
├── backend
│   └── TaskManagerAPI
│       ├── Application
│       │   ├── Interfaces
│       │   └── Services
│       │
│       ├── Infrastructure
│       │   ├── Interfaces
│       │   └── Services
│       │
│       ├── Controllers
│       ├── DTOs
│       │   ├── Auth
│       │   ├── Tasks
│       │   └── Users
│       │
│       ├── Models
│       └── Data
│
└── frontend
    └── taskmanager-frontend
```

---

# 🚀 Como Executar o Projeto

## Pré-requisitos

* .NET 8 SDK
* SQL Server
* Node.js
* Git

---

## Backend

```bash
cd backend/TaskManagerAPI

dotnet restore

dotnet ef database update

dotnet run
```

A API estará disponível em:

```text
https://localhost:7138
```

---

## Frontend

```bash
cd frontend/taskmanager-frontend

npm install

npm run dev
```

O frontend estará disponível em:

```text
http://localhost:5173
```

---

# 🎯 Conceitos Praticados

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* ASP.NET Identity
* JWT Authentication
* React
* TypeScript
* Dependency Injection
* Arquitetura em Camadas
* CRUD Completo

---

# 📈 Próximos Passos

* [ ] Testes de Integração
* [ ] Tratamento global de exceções
* [ ] Logs estruturados
* [ ] Refresh Token
* [ ] Deploy da API
* [ ] Deploy do Frontend
* [ ] CI/CD com GitHub Actions

---

# 👨‍💻 Autor

**Sanzio Wesley Rodrigues dos Santos**

GitHub: https://github.com/SanzioWesley

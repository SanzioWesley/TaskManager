# 📋 TaskManager - Full Stack Application

![.NET 8](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![SQL Server](https://img.shields.io/badge/SQL%20Server-2022-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 📌 Sobre o Projeto

TaskManager é uma aplicação full stack para gerenciamento de tarefas, desenvolvida com foco em **boas práticas** e **arquitetura limpa**. O objetivo é demonstrar proficiência em desenvolvimento web moderno.

### ✨ Funcionalidades Implementadas

- ✅ Backend em .NET 8 com **Entity Framework Core** (Code First)
- ✅ Banco de dados **SQL Server** rodando em container Docker
- ✅ Modelagem de domínio com **relacionamentos** (User 1:N Tasks)
- ✅ **Migrations** para versionamento do esquema do banco
- ✅ **Fluent API** para configurações avançadas (índices, chaves)
- ✅ Ambiente de desenvolvimento isolado com **Docker Compose**


## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| .NET | 8.0 | API Backend |
| Entity Framework Core | 8.0 | ORM e migrations |
| SQL Server | 2022 | Banco de dados |
| Docker | 24.0+ | Containerização |
| React (em breve) | 18.0 | Frontend |

## 📦 Como Executar o Projeto

### Pré-requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Git](https://git-scm.com/)

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/SanzioWesley/TaskManager.git
   cd TaskManager

2. **Inicie o container do SQL Server**
   ```bash
   docker-compose up -d sqlserver

3. **Execute as migrations para criar o banco**
   ```bash
   cd backend/TaskManagerAPI
   dotnet ef database update

4. **(Opcional) Teste a conexão com o banco**
   ```bash
   docker exec -it taskmanager-sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P TaskManager@123 -C -Q "SELECT @@VERSION"

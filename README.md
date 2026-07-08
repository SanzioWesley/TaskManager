# 📝 TaskManager Full-Stack

Um gerenciador de tarefas moderno e seguro, desenvolvido para facilitar a organização pessoal e o acompanhamento de produtividade, focado em boas práticas de arquitetura e experiência do usuário.

## 📸 Screenshots do Projeto

<p align="center">
  <img src="https://github.com/SanzioWesley/TaskManager/blob/main/login.png?raw=true" width="45%" alt="Tela de Login" />
  <img src="https://github.com/SanzioWesley/TaskManager/blob/main/dashboard.png?raw=true" width="45%" alt="Dashboard de Tarefas" />
</p>

---

## 🚀 Tecnologias Utilizadas

**Backend:**
- **.NET 8 (ASP.NET Core)**
- **Entity Framework Core** (SQL Server)
- **JWT (JSON Web Tokens)** para Autenticação segura
- **Middleware Global** de tratamento de exceções
- **Dependency Injection** organizada via Extension Methods

**Frontend:**
- **React.js** com TypeScript
- **Hooks & Props** avançados (useEffect, useState)
- **Axios** para consumo da API REST
- **CSS Responsivo** com foco em UX

---

## 💡 Principais Diferenciais
- **Segurança de Ponta:** Implementação completa de fluxo de login e registro com proteção de rotas via JWT.
- **CRUD 100% Funcional:** Criação, listagem com filtros, edição dinâmica e exclusão de tarefas.
- **Arquitetura Limpa:** Separação clara de responsabilidades entre Controllers, Services e Camada de Dados no Backend.
- **Formulários Inteligentes:** O componente de formulário detecta automaticamente se o usuário deseja criar uma nova tarefa ou editar uma existente.

---

## 🛠️ Como rodar o projeto localmente

### 1. Backend
- Navegue até `backend/TaskManagerAPI`.
- Configure sua Connection String no `appsettings.json`.
- Execute:
  ```bash
  dotnet ef database update
  dotnet run

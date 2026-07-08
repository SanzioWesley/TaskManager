# 📝 TaskManager Full-Stack

Um gerenciador de tarefas moderno e seguro, desenvolvido com foco em boas práticas de arquitetura e experiência do usuário.

## 🚀 Tecnologias Utilizadas

**Backend:**
- .NET 8 (ASP.NET Core)
- Entity Framework Core (SQL Server)
- JWT (JSON Web Tokens) para Autenticação
- Middleware Global de Tratamento de Erros
- Injeção de Dependência organizada com Extension Methods

**Frontend:**
- React.js com TypeScript
- Hooks (useState, useEffect) e Props avançados
- Axios para integração com a API
- CSS moderno e responsivo

## 💡 Principais Features
- **Fluxo de Autenticação:** Login e Registro protegidos com JWT.
- **CRUD Completo:** Criação, Listagem, Edição e Exclusão de tarefas.
- **Validação Dinâmica:** Formulário inteligente que alterna entre Criação e Edição.
- **Tratamento de Exceções:** Sistema robusto no backend para capturar erros e responder de forma organizada.

## 🛠️ Como rodar o projeto localmente

### Backend
1. Navegue até `backend/TaskManagerAPI`.
2. Configure a string de conexão do seu SQL Server no `appsettings.json`.
3. Execute as migrations: `dotnet ef database update`.
4. Rode a aplicação: `dotnet run`.

### Frontend
1. Navegue até a pasta do frontend.
2. Instale as dependências: `npm install`.
3. Inicie o projeto: `npm start`.

---
## 🧠 Evolução Pessoal
Este projeto representa minha transição para o desenvolvimento Full-Stack. Aprendi a integrar camadas complexas, gerenciar estados globais no React e garantir a segurança dos dados através do backend.

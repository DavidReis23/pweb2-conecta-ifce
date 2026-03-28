```markdown
# 🎓 ConectaIFCE - Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

> [cite_start]Aplicação frontend desenvolvida como Trabalho Avaliativo Teórico/Prático (N2) para a disciplina de Programação Web II do Instituto Federal do Ceará (Campus Tauá)[cite: 3, 5, 7].

O **ConectaIFCE** é uma rede social acadêmica projetada para conectar estudantes, professores e técnicos. [cite_start]A aplicação permite o compartilhamento de ideias, interações sociais e acompanhamento de postagens em tempo real, utilizando React, Vite, TypeScript, TailwindCSS e shadcn/ui [cite: 9][cite_start], e consumindo uma API REST autenticada[cite: 13].

---

## 🚀 Tecnologias e Ferramentas

O ecossistema do projeto foi escolhido focando em performance, tipagem estática e produtividade:

* [cite_start]**Core:** React, TypeScript e Vite[cite: 31].
* [cite_start]**Estilização e UI:** Tailwind CSS e shadcn/ui[cite: 32, 33].
* [cite_start]**Roteamento:** React Router DOM[cite: 36].
* **Formulários e Validação:** React Hook Form e Zod.
* [cite_start]**Padronização de Código:** ESLint e Prettier[cite: 34].

---

## ⚙️ Funcionalidades Principais

A aplicação possui um escopo completo de rede social:

* [cite_start]**Autenticação:** Login e registro de usuários com JWT[cite: 38, 41].
* [cite_start]**Segurança:** Proteção de rotas privadas e persistência de sessão[cite: 39].
* [cite_start]**Feed e Postagens:** Visualização do feed principal e criação de novos posts[cite: 42, 43].
* [cite_start]**Interações Sociais:** Sistema de curtidas e comentários em postagens[cite: 44, 45].
* [cite_start]**Conexões:** Visualização de perfil de usuários [cite: 46][cite_start], além de sistema de seguir (Follow) e deixar de seguir (Unfollow)[cite: 47].
* [cite_start]**Feedback Visual:** Tratamento de erros centralizado (API) [cite: 48] [cite_start]e estados de carregamento (Loading)[cite: 49].

---

## 🧠 Decisões Técnicas e Evolução do Projeto

Durante o desenvolvimento desta aplicação, busquei ir além da reprodução do código das videoaulas, implementando refatorações arquiteturais e melhorias focadas em manutenibilidade, escalabilidade e tipagem segura. [cite_start]Abaixo, explico as principais decisões técnicas adotadas, principalmente relacionadas às mudanças em relação ao projeto original desenvolvido pelo professor nas videoaulas[cite: 51].

### 1. Desacoplamento da Camada de Comunicação (Services) e View Model
Na abordagem inicial, os *Custom Hooks* (como o `useFormLogin`) acumulavam múltiplas responsabilidades: gerenciavam o estado local do formulário (validação com Zod), faziam o *fetch* direto na API e manipulavam o `localStorage`.

* **A Mudança:** Refatorei a arquitetura extraindo toda a lógica de comunicação externa para uma camada dedicada de Serviços (`src/features/auth/services/login.service.ts` e `register.service.ts`).
* **Justificativa Técnica:** Essa separação garante que os componentes visuais e seus respectivos hooks (View Model) não precisem conhecer detalhes da infraestrutura de rede. O hook agora apenas delega os dados validados para o serviço e aguarda a resposta. Isso facilita a criação de testes unitários no futuro e permite que a mesma chamada de API seja reaproveitada em outros lugares da aplicação sem duplicar código.

### 2. Padronização Rigorosa com Data Transfer Objects (DTOs)
Para garantir que a comunicação entre o Frontend e a API REST fosse totalmente previsível, implementei o padrão DTO na pasta `types/dto`.

* **A Mudança:** Criei tipagens estritas como `UserRequestDTO` e `UserResponseDTO`. Durante o desenvolvimento da tela de Registro, surgiu um conflito de domínio: o formulário (Zod) gerava o campo vínculo em minúsculo (`student`), mas a API exigia caixa alta (`STUDENT`).
* **Justificativa Técnica:** Ao invés de enfraquecer a tipagem usando `any` ou ignorar o erro do TypeScript, mantive o contrato do DTO estrito e criei uma camada de adaptação (Data Mapper) diretamente no envio do formulário, utilizando `.toUpperCase()`. Isso garantiu a integridade do *payload* antes de tocar na camada de rede.

### 3. Centralização do Estado Autenticado (Context API)
O gerenciamento do usuário logado precisava estar disponível globalmente, para que componentes distintos (como o Feed, Navbar e o fluxo de rotas privadas) pudessem reagir a mudanças de sessão.

* **A Mudança:** Implementação do `AuthContext` provido na raiz da árvore de componentes (`main.tsx`). A função `setAuthUser` foi acoplada diretamente no fluxo de sucesso dos formulários de Login e Registro.
* **Justificativa Técnica:** A utilização da Context API evitou o antipadrão de *Prop Drilling* (passar propriedades de componente em componente). Além disso, a sincronização do contexto com o *Storage* garante que, mesmo ao recarregar a página, a aplicação recupere o usuário em memória hidratando o estado global. A página `/feed` foi a primeira a consumir esse contexto via `useAuth()`, exibindo o *handle* do usuário dinamicamente de forma limpa e assíncrona.

### 4. Tratamento de Erros Customizado no Cliente HTTP
O uso do `fetch` nativo espalhado pelo código gera redundância no tratamento de erros (já que o `fetch` não rejeita promessas em status `4xx` ou `5xx`).

* **A Mudança:** Adoção do utilitário `http-client.ts` atuando como um *wrapper* para as requisições, injetando a URL base da API (via variáveis de ambiente) e lançando uma classe customizada `ApiError`.
* **Justificativa Técnica:** Centralizar a configuração de requisições permite capturar o corpo de erro padronizado da API e lançar uma exceção amigável. Na interface, os blocos `try/catch` apenas verificam se o erro é uma instância de `ApiError` (`if (error instanceof ApiError)`) e repassam a mensagem (ex: "Credenciais inválidas") para o estado de erro do componente, melhorando substancialmente a Experiência do Usuário (UX).

---

## 💻 Como executar o projeto localmente

Siga o passo a passo para rodar o ambiente de desenvolvimento:

1. **Clone este repositório:**
   ```bash
   git clone [https://github.com/DavidReis/pweb2-conecta-ifce.git](https://github.com/SEU_USUARIO/pweb2-conecta-ifce.git)
   ```

2. **Acesse o diretório do projeto:**
   ```bash
   cd pweb2-conecta-ifce
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com a URL da API disponibilizada:
   ```env
   VITE_API_URL=[https://conectaifce-api.proflucasmendes.com.br](https://conectaifce-api.proflucasmendes.com.br)
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

O frontend estará disponível em `http://localhost:5173`.

---
*Professor: Me. [cite_start]Lucas Mendes [cite: 4]* [cite_start]*Disciplina: Programação Web II [cite: 5]* ```

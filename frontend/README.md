# Top 5 Tião Carreiro - Frontend React

Esta é a aplicação frontend React para o projeto Top 5 Tião Carreiro, desenvolvida com React 18, TypeScript e TailwindCSS.

## Funcionalidades

- **Interface Responsiva**: Design moderno e adaptável para todos os dispositivos
- **Autenticação de Usuários**: Login, registro e gerenciamento de sessão
- **Visualização de Músicas**: Top 5 mais tocadas e lista completa com paginação
- **Sistema de Sugestões**: Usuários podem sugerir novas músicas
- **Painel Administrativo**: Gerenciamento completo de músicas e sugestões
- **Integração com API**: Comunicação RESTful com backend Laravel

## Tecnologias

- React 18
- TypeScript
- Vite (Build Tool)
- React Router (Navegação)
- TailwindCSS (Estilização)
- Axios (Cliente HTTP)
- Lucide React (Ícones)

## Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API backend no arquivo `src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8000/api';
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── Layout.tsx      # Layout principal da aplicação
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── pages/              # Páginas da aplicação
│   ├── Home.tsx       # Página principal
│   ├── Login.tsx      # Página de login
│   ├── Register.tsx   # Página de registro
│   └── AdminDashboard.tsx # Painel administrativo
├── services/           # Serviços de API
│   └── api.ts        # Cliente HTTP da API
├── types/              # Tipos TypeScript
│   └── index.ts       # Definições de tipos
├── App.tsx            # Componente principal
├── main.ts            # Ponto de entrada
└── style.css          # Estilos globais
```

## Funcionalidades Detalhadas

### 🏠 Página Principal
- Exibição das 5 músicas mais tocadas em cards destacados
- Lista completa de todas as músicas com paginação
- Formulário para sugestão de novas músicas (usuários autenticados)
- Visualização das sugestões pendentes

### 🔐 Autenticação
- **Login**: Acesso com email e senha
- **Registro**: Criação de novas contas
- **Proteção de Rotas**: Redirecionamento automático para usuários não autenticados
- **Gerenciamento de Sessão**: Armazenamento seguro de tokens

### 👤 Painel Administrativo
- **Gerenciamento de Sugestões**: Aprovar, rejeitar ou excluir sugestões
- **CRUD de Músicas**: Criar, editar e excluir músicas
- **Interface Intuitiva**: Tabs organizados para diferentes funcionalidades
- **Acesso Restrito**: Apenas administradores podem acessar

### 🎨 Design e UX
- **Design Responsivo**: Adaptação para mobile, tablet e desktop
- **Interface Moderna**: Utilização de TailwindCSS para estilização
- **Feedback Visual**: Estados de loading, mensagens de erro e sucesso
- **Navegação Intuitiva**: Menu claro e organizado

## Usuários para Teste

### Usuário Comum
- **Email**: `test@example.com`
- **Senha**: `password`

### Administrador
- **Email**: `admin@example.com`
- **Senha**: `password`

## Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8000/api
```

## Integração com Backend

O frontend se comunica com o backend através dos seguintes endpoints:

### Autenticação
- `POST /auth/register` - Registro de usuário
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `GET /auth/user` - Dados do usuário autenticado

### Músicas
- `GET /songs/top-five` - Top 5 músicas
- `GET /songs` - Lista completa (paginada)
- `POST /songs` - Criar música (admin)
- `PUT /songs/{id}` - Atualizar música (admin)
- `DELETE /songs/{id}` - Excluir música (admin)

### Sugestões
- `GET /song-suggestions` - Listar sugestões
- `POST /song-suggestions` - Criar sugestão
- `PUT /song-suggestions/{id}` - Atualizar status (admin)
- `DELETE /song-suggestions/{id}` - Excluir sugestão (admin)

## Deploy

### Build para Produção
```bash
npm run build
```

O comando gera uma pasta `dist` com os arquivos otimizados para produção.

### Configuração de Servidor

Configure seu servidor web para servir os arquivos estáticos da pasta `dist` e configure o proxy para as requisições da API.

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a MIT License.

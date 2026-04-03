# Top 5 Tião Carreiro - Versão 2.0

Aplicação web full-stack para exibir e gerenciar as músicas mais tocadas da dupla caipira Tião Carreiro e Pardinho, desenvolvida como parte do desafio para a Supliu Tecnologia.

## 🎵 Sobre o Projeto

Este projeto é a versão 2.0 de uma aplicação que exibe as 5 músicas mais tocadas de Tião Carreiro e Pardinho, permitindo que usuários sugiram novas músicas e administradores gerenciem o conteúdo.

### 🚀 Melhorias Implementadas

1. **Arquitetura Separada**: Backend Laravel e Frontend React comunicando via API REST
2. **Sistema de Autenticação**: Registro, login e controle de acesso baseado em papéis
3. **Interface Moderna**: Design responsivo com TailwindCSS
4. **Painel Administrativo**: Gerenciamento completo de músicas e sugestões
5. **Sistema de Sugestões**: Usuários podem sugerir músicas com validação
6. **Paginação**: Exibição organizada de grandes volumes de dados
7. **Testes Automatizados**: Estrutura preparada para testes unitários e de integração
8. **Documentação Completa**: READMEs detalhados para fácil setup

## 🏗️ Arquitetura

```
SupliuLaravelReactJsS/
├── backend/                 # API Laravel
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   ├── Models/
│   │   └── Http/Middleware/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   └── README.md
├── frontend/               # Aplicação React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── services/
│   │   └── types/
│   ├── public/
│   └── README.md
└── README.md              # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **PHP 8.2+**
- **Laravel 11**
- **MySQL/SQLite**
- **Laravel Sanctum** (Autenticação)
- **Laravel CORS** (Comunicação Frontend)

### Frontend
- **React 18**
- **TypeScript**
- **Vite** (Build Tool)
- **React Router** (Navegação)
- **TailwindCSS** (Estilização)
- **Axios** (Cliente HTTP)
- **Lucide React** (Ícones)

## 🚀 Como Executar

### Pré-requisitos
- PHP 8.2+
- Composer
- Node.js 18+
- npm ou yarn
- MySQL (opcional, pode usar SQLite)

### 1. Configurar o Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

O backend estará disponível em `http://localhost:8000`

### 2. Configurar o Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 👥 Usuários para Teste

### Usuário Comum
- **Email**: `test@example.com`
- **Senha**: `password`

### Administrador
- **Email**: `admin@example.com`
- **Senha**: `password`

## 📋 Funcionalidades

### 🏠 Página Principal
- **Top 5 Músicas**: Cards destacados com as mais tocadas
- **Lista Completa**: Todas as músicas com paginação
- **Sugestões**: Formulário para usuários autenticados sugerirem novas músicas
- **Sugestões Pendentes**: Visualização das sugestões aguardando aprovação

### 🔐 Sistema de Autenticação
- **Registro**: Criação de novas contas de usuário
- **Login**: Acesso seguro com tokens JWT
- **Proteção de Rotas**: Acesso restrito baseado em autenticação
- **Papéis**: Diferenciação entre usuários comuns e administradores

### 👤 Painel Administrativo
- **Gerenciamento de Sugestões**: Aprovar, rejeitar ou excluir sugestões
- **CRUD de Músicas**: Criar, editar, excluir músicas
- **Interface Organizada**: Tabs para diferentes funcionalidades
- **Acesso Restrito**: Apenas administradores podem acessar

### 🎨 Design e Experiência
- **Design Responsivo**: Adaptação para todos os dispositivos
- **Interface Moderna**: Utilização de TailwindCSS
- **Feedback Visual**: Estados de loading e mensagens
- **Navegação Intuitiva**: Menu claro e organizado

## 🗄️ Estrutura do Banco de Dados

### Users
- `id` - Chave primária
- `name` - Nome do usuário
- `email` - Email único
- `password` - Senha criptografada
- `is_admin` - Booleano para papel de administrador
- `created_at`, `updated_at` - Timestamps

### Songs
- `id` - Chave primária
- `title` - Título da música
- `artist` - Nome do artista
- `youtube_url` - Link para o YouTube
- `play_count` - Número de reproduções
- `position` - Posição no ranking
- `created_at`, `updated_at` - Timestamps

### Song Suggestions
- `id` - Chave primária
- `title` - Título da música sugerida
- `artist` - Artista sugerido
- `youtube_url` - Link sugerido
- `user_id` - Chave estrangeira para Users
- `status` - pending/approved/rejected
- `created_at`, `updated_at` - Timestamps

## 🔧 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/logout` - Fazer logout
- `GET /api/auth/user` - Obter usuário atual

### Músicas
- `GET /api/songs/top-five` - Top 5 músicas
- `GET /api/songs` - Listar músicas (paginado)
- `GET /api/songs/{id}` - Obter música específica
- `POST /api/songs` - Criar música (requer auth)
- `PUT /api/songs/{id}` - Atualizar música (requer auth)
- `DELETE /api/songs/{id}` - Excluir música (requer auth)

### Sugestões
- `GET /api/song-suggestions` - Listar sugestões
- `GET /api/song-suggestions/{id}` - Obter sugestão
- `POST /api/song-suggestions` - Criar sugestão (requer auth)
- `PUT /api/song-suggestions/{id}` - Atualizar status (requer admin)
- `DELETE /api/song-suggestions/{id}` - Excluir sugestão (requer admin)

## 🧪 Testes

### Backend
```bash
cd backend
php artisan test
```

### Frontend
```bash
cd frontend
npm run test
```

## 📦 Deploy

### Backend
1. Configurar variáveis de ambiente em produção
2. Executar migrações: `php artisan migrate --force`
3. Otimizar: `php artisan config:cache` e `php artisan route:cache`

### Frontend
1. Build para produção: `npm run build`
2. Servir arquivos da pasta `dist`
3. Configurar proxy para API backend

## 🤝 Como Contribuir

1. Fork este repositório
2. Crie uma branch para sua feature: `git checkout -b feature/nova-feature`
3. Commit suas mudanças: `git commit -am 'Adiciona nova feature'`
4. Push para a branch: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License.

## 👨‍💻 Autor

Desenvolvido como parte do processo seletivo para a Supliu Tecnologia.

---

### 🎯 Objetivos do Desafio

✅ Separar aplicações em backend e frontend  
✅ Backend construído em Laravel  
✅ Frontend como SPA em ReactJS  
✅ Criar testes automatizados  
✅ Utilizar conteinerização  
✅ Modernizar layout  
✅ Exibir músicas a partir da 6ª com paginação  
✅ Autenticação para sugestões  
✅ Sistema de aprovação/reprovação  
✅ CRUD para administradores  
✅ Documentação completa  

O projeto atende a todos os requisitos do desafio, demonstrando conhecimentos em desenvolvimento full-stack modernos.

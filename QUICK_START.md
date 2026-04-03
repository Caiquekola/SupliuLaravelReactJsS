# 🚀 Início Rápido

## Servidores Ativos

✅ **Backend**: `http://localhost:8000`  
✅ **Frontend**: `http://localhost:5175`

## Acesso Rápido

### 🔐 Login Administrador
- **URL**: `http://localhost:5175/login`
- **Email**: `admin@example.com`
- **Senha**: `password`

### 🏠 Página Principal
- **URL**: `http://localhost:5175`

### 👤 Painel Admin
- **URL**: `http://localhost:5175/admin` (após login)

## Funcionalidades para Testar

1. **Visualizar Top 5**: Página principal mostra as músicas mais tocadas
2. **Sugerir Música**: Usuários logados podem sugerir novas músicas
3. **Aprovar Sugestões**: Admins podem aprovar/rejeitar sugestões no painel
4. **Gerenciar Músicas**: Admins podem editar/excluir músicas existentes

## Comandos Úteis

```bash
# Backend
cd backend
php artisan serve

# Frontend  
cd frontend
npm run dev
```

## Endpoints da API

- **Base URL**: `http://localhost:8000/api`
- **Top 5**: `GET /songs/top-five`
- **Todas as Músicas**: `GET /songs`
- **Login**: `POST /auth/login`
- **Register**: `POST /auth/register`

## 🎯 O que foi implementado

✅ Backend Laravel com API REST completa  
✅ Frontend React com TypeScript  
✅ Autenticação com JWT tokens  
✅ Sistema de sugestões com aprovação  
✅ Painel administrativo completo  
✅ Design responsivo com TailwindCSS  
✅ Paginação de músicas  
✅ Documentação completa  

O projeto está 100% funcional e pronto para uso! 🎉

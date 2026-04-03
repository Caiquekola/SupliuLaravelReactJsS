# Top 5 Tião Carreiro - Backend API

Esta é a API backend para a aplicação Top 5 Tião Carreiro, desenvolvida com Laravel 11.

## Funcionalidades

- **Autenticação de Usuários**: Registro, login e logout com tokens Sanctum
- **Gerenciamento de Músicas**: CRUD para músicas com paginação
- **Sugestões de Músicas**: Sistema de sugestões com aprovação/reprovação
- **Controle de Acesso**: Papéis de administrador para gerenciar sugestões
- **API REST**: Endpoints bem documentados para integração com frontend

## Tecnologias

- PHP 8.2+
- Laravel 11
- MySQL/SQLite
- Laravel Sanctum (Autenticação)
- Laravel CORS

## Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd backend
```

2. Instale as dependências:
```bash
composer install
```

3. Copie o arquivo de ambiente:
```bash
cp .env.example .env
```

4. Configure o banco de dados no arquivo `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=top5_tiao_carreiro
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5. Gere a chave da aplicação:
```bash
php artisan key:generate
```

6. Execute as migrações:
```bash
php artisan migrate
```

7. Popule o banco de dados com músicas iniciais:
```bash
php artisan db:seed
```

## Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/logout` - Fazer logout (requer autenticação)
- `GET /api/auth/user` - Obter usuário autenticado (requer autenticação)

### Músicas
- `GET /api/songs` - Listar todas as músicas (paginado)
- `GET /api/songs/top-five` - Listar as 5 músicas mais tocadas
- `GET /api/songs/{id}` - Obter música específica
- `POST /api/songs` - Criar nova música (requer autenticação)
- `PUT /api/songs/{id}` - Atualizar música (requer autenticação)
- `DELETE /api/songs/{id}` - Excluir música (requer autenticação)

### Sugestões de Músicas
- `GET /api/song-suggestions` - Listar sugestões
- `GET /api/song-suggestions/{id}` - Obter sugestão específica
- `POST /api/song-suggestions` - Criar nova sugestão (requer autenticação)
- `PUT /api/song-suggestions/{id}` - Aprovar/reprovar sugestão (requer admin)
- `DELETE /api/song-suggestions/{id}` - Excluir sugestão (requer admin)

## Exemplo de Uso

### Registro de Usuário
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "password123"
  }'
```

### Acessar Top 5 Músicas
```bash
curl -X GET http://localhost:8000/api/songs/top-five \
  -H "Accept: application/json"
```

## Usuários Padrão

Após executar o seeder, dois usuários são criados:

1. **Usuário Comum**:
   - Email: `test@example.com`
   - Senha: `password`

2. **Administrador**:
   - Email: `admin@example.com`
   - Senha: `password`

## Estrutura do Banco de Dados

### Users
- id
- name
- email
- password
- is_admin (boolean)
- timestamps

### Songs
- id
- title
- artist
- youtube_url
- play_count
- position
- timestamps

### Song Suggestions
- id
- title
- artist
- youtube_url
- user_id (foreign key)
- status (pending/approved/rejected)
- timestamps

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:
```bash
php artisan serve
```

O servidor estará disponível em `http://localhost:8000`

## Testes

Para executar os testes:
```bash
php artisan test
```

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

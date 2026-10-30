# next-saas-rbac

Base de um SaaS multi-tenant com controle de acesso por papéis (RBAC). Projeto de estudo organizado como monorepo.

## Estrutura

```
apps/api/        API HTTP (Fastify + Prisma)
packages/auth/   regras de permissão compartilhadas (CASL)
config/          configurações compartilhadas de ESLint, Prettier e TypeScript
```

## Destaques

- **RBAC com CASL:** papéis `ADMIN`, `MEMBER` e `BILLING`, com permissões definidas por assunto (organização, projeto, usuário, convite e cobrança) em um pacote reutilizável entre API e front-end
- **Multi-tenant:** usuários pertencem a organizações, e as permissões são avaliadas no contexto de cada organização
- **Autenticação:** cadastro, login com senha (bcrypt + JWT), perfil, recuperação e redefinição de senha
- **Validação e documentação:** schemas Zod integrados ao Fastify, com Swagger UI gerado a partir deles
- **Monorepo:** pnpm workspaces + Turborepo, com configurações de lint e TypeScript compartilhadas

## Stack

TypeScript · Node.js · Fastify · Prisma · PostgreSQL · Zod · JWT · CASL · Turborepo · pnpm · Docker Compose

## Como rodar

```bash
pnpm install
docker compose up -d
cd apps/api
pnpm prisma migrate dev
pnpm prisma db seed
pnpm dev
```

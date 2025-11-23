# Monorepo Frontend with Galaxy

Este projeto é um monorepo gerenciado por [pnpm](https://pnpm.io/) workspace.

## Estrutura

- `api-products/`: API MeteorJS responsável por prover os dados de produtos via REST
- `home/`: Aplicação principal que carrega remotes de forma federada
- `list-products/`: Aplicação React remota responsável por renderizar a lista de produtos

## Como instalar as dependências

```sh
pnpm install
```

## Como rodar cada pacote

Para visualizar a arquitetura completa, use três terminais:

```sh
# 1) API Meteor
pnpm --filter api-products start

# 2) Remote list-products (porta 4174 por padrão)
pnpm --filter list-products dev

# 3) Shell principal que consome o remote (porta 4173)
pnpm --filter home dev
```

A API Meteor sobe na porta `3000` e expõe `GET /api/products` para que os remotes consumam os dados.

## Configurações compartilhadas
- ESLint: `eslint.config.js` na raiz
- TypeScript: `tsconfig.base.json` na raiz

## Arquitetura

- **Backend (MeteorJS):** provê um endpoint REST (`/api/products`) com seed automático e CORS liberado.
- **Remotes (Module Federation):** `list-products` gera um `remote-entry` ESM servido pelo Vite para consumo em outras aplicações.
- **Host:** `home` carrega o `remote-entry` em tempo de execução e exibe o catálogo federado, mantendo os pacotes front-end independentes e escaláveis.

## Observações
- Cada pacote pode ter suas dependências e configurações específicas.
- Use sempre o comando `pnpm` na raiz do monorepo para instalar dependências e rodar scripts.

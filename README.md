# Monorepo Frontend with Galaxy

Este projeto é um monorepo gerenciado por [pnpm](https://pnpm.io/) workspace.

## Estrutura

- `home/`: Aplicação principal
- `list-products/`: Aplicação de listagem de produtos

## Como instalar as dependências

```sh
pnpm install
```

## Como rodar cada pacote

```sh
pnpm --filter home dev
pnpm --filter list-products dev
```

## Configurações compartilhadas
- ESLint: `eslint.config.js` na raiz
- TypeScript: `tsconfig.base.json` na raiz

## Observações
- Cada pacote pode ter suas dependências e configurações específicas.
- Use sempre o comando `pnpm` na raiz do monorepo para instalar dependências e rodar scripts.

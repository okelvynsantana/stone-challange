<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Stone_pagamentos.png/1200px-Stone_pagamentos.png" width="320" alt="Stone Logo" />
</p>

## Descrição

Api desenvolvida para o desafio para vaga da Stone.

## Primeiros passos

1. Você precisará de Node 12 instalado e do Postgres 11 ou superior.
2. Instale dependências com `yarn`.
3. Copie o arquivo `.env.example` para o arquivo `.env`.
4. Se você tiver um Postgres local instalado, crie um database vazio nele e configure o `.env` com os acessos.
5. Se não tiver, utilize `yarn postgres:start` e `yarn database:create` para criar e configurar um com Docker.
6. Execute o projeto localmente com `yarn start:dev`.
7. Execute a suite de testes do projeto com `yarn test`.


## Rodando a API
```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Rodando as Migrations
1. Migrações podem ser executadas em ambiente local utilizando o comando `yarn typeorm migrartion:run`. Isso é feito automaticamente pelo `yarn start:dev`

2. Caso queira reverter a última migração executada em no ambiente local, rode `yarn typeorm migration:revert`.


## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

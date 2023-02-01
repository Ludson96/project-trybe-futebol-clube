# Repositório do projeto Trybe futebol clube

## Módulo: BACK-END

 Repositório possuí projeto desenvolvido no período que estive na **Trybe**, abordando os conceitos de **API Rest** com CRUD completo em **TypeScript**, com utilização da ORM **Sequelize**, além de construir o projeto de acordo com o paradigma de orientação a objetos (**POO**) e **SOLID**. **Docker** para rodar o frontend, backend e database, separados e utilizando a arquitetura **MSC**. </br>
Para testar a abordagem fora usados testes via **Mocha**, **Chai**, **Sinon**, com abordagem variando entre **TDD** e **BDD**;

## Informações de aprendizados

- Este é um projeto desenvolvido para me ajudar a aprender `TypeScript`;

- Meu terceiro projeto usando `TypeScript`;

- Segundo projeto usando princípios da arquitetura SOLID;

- Segundo projeto usando princípios POO;

- Utilizei o Cliente Rest `Thunder Client`, como extensão, para visualizar o retorno do meu acesso.

## Linguagem usadas

[![JavaScript][JavaScript-logo]][JavaScript-url]
[![NodeJS][NodeJS-logo]][NodeJS-url]
[![Docker][Docker-logo]][Docker-url]
[![Nodemon][Nodemon-logo]][Nodemon-url]
[![ESLint][ESLint-logo]][ESLint-url]
[![TypeScript][TypeScript-logo]][TypeScript-url]
[![ts-node][ts-node-logo]][ts-node-url]
[![Express][Express-logo]][Express-url]
[![JWT][JWT-logo]][JWT-url]
[![MySQL][MySQL-logo]][MySQL-url]
[![Sequelize][Sequelize-logo]][Sequelize-url]
[![.ENV][.ENV-logo]][.ENV-url]
[![Jest][Jest-logo]][Jest-url]
[![Mocha][Mocha-logo]][Mocha-url]
[![Chai][Chai-logo]][Chai-url]

## O que foi desenvolvido

Criação de uma API Rest utilizando POO e princípios SOLID com construção de CRUD utilizando Sequelize para queries e docker para rodas os ambientes de forma separada. O projeto é fullstack e representa uma simulação de uma tabela de um campeonato de futebol, com uma validação via login para saber se o usuário é admin ou não, o que libera novas features onde podemos alterar dados da partida, inserir novas partidas ou finalizar partidas em andamento. Na parte de frontend podemos filtrar os resultados, modificar e finalizar partidas, desde que seja admin, além de poder verificar a classificação geral, classificação de time mandante e de time visitante de forma separada.

## Instruções para instalar e rodar

1. Clone o repo:

    ```bash
    git clone git@github.com:Ludson96/project-trybe-futebol-clube.git
    ```

1. Entre na pasta do repositório que você acabou de clonar:

    ```bash
    cd project-trybe-futebol-clube
    ```

1. Instale as dependências e inicialize o projeto:

    ```bash
    npm install
    ```

1. Execute o docker compose:

    ```bash
    npm run compose:up
    ```

## Uso

O `npm run compose:up` script criará o banco de dados e iniciará o frontend e backend serviços.

Você pode verificar o site em `localhost:3000/login`

- e teste o aplicativo usando o login(usuário comum):
  - email: user@user.com
  - senha: secret_user

É possível:

- criar novas partidas;
- editar partidas em andamento;
- finalizar as partidas.

> `frontend`, `seeders` e `docker-compose.yml` foram fornecidos pela Trybe, o dockerfile foi construído por mim.

[JavaScript-logo]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JavaScript-url]: https://www.javascript.com/
[Express-logo]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com
[NodeJS-logo]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/
[MySQL-logo]: https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com
[Docker-logo]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com
[Nodemon-logo]: https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon&logoColor=fff&style=for-the-badge
[Nodemon-url]: https://www.npmjs.com/package/nodemon
[JWT-logo]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[JWT-url]: https://jwt.io/
[ESLint-logo]: https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/
[TypeScript-logo]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[ts-node-logo]: https://img.shields.io/badge/ts--node-3178C6?logo=tsnode&logoColor=fff&style=for-the-badge
[ts-node-url]: https://www.npmjs.com/package/ts-node-dev
[.ENV-logo]: https://img.shields.io/badge/.ENV-ECD53F?logo=dotenv&logoColor=000&style=for-the-badge
[.ENV-url]: https://www.npmjs.com/package/dotenv
[Sequelize-logo]: https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white
[Sequelize-url]: https://sequelize.org
[Jest-logo]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io
[Chai-logo]: https://img.shields.io/badge/Chai-A30701?logo=chai&logoColor=fff&style=for-the-badge
[Chai-url]: https://www.chaijs.com
[Mocha-logo]: https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white
[Mocha-url]: https://mochajs.org

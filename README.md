<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn add typeorm pg dotenv

$
```
#### Variable Environment
```env
BASE_URL=localhost
PORT=5000
ENVIRONMENT=development

DATABASE_URL=postgres://postgres:root@localhost:5432/loja
TYPEORM_TYPE_DATABASE=postgres
TYPEORM_HOST=localhost
TYPEORM_TYPE=3306
TYPEORM_USERNAME=test
TYPEORM_PASSWORD=test
TYPEORM_DATABASE=test,
TYPEORM_SYNCHRONIZE=false
TYPEORM_LOGGING=false
TYPEORM_ENTITIES=src/entity/**/*.ts
TYPEORM_MIGRATIONS=src/migration/**/*.ts
TYPEORM_SUBSCRIBERS=subscribers:src/subscriber/**/*.ts
TYPEORM_ENTITIES_DIR=src/entity
TYPEORM_MIGRATIONS_DIR=src/migration
TYPEORM_SUBSCRIBERS_DIR=src/subscriber

```
#### Config Typeorm
```js
module.exports = {
   "type": process.env.TYPEORM_TYPE_DATABASE,
   "url": process.env.DATABASE_URL,
   "synchronize": process.env.TYPEORM_SYNCHRONIZE,
   "logging": process.env.TYPEORM_LOGGING,
   "entities": [
      process.env.TYPEORM_ENTITIES,
   ],
   "migrations": [
      process.env.TYPEORM_MIGRATIONS,
   ],
   "subscribers": [
      process.env.TYPEORM_SUBCRIBERS,
   ],
   "cli": {
      "entitiesDir": process.env.TYPEORM_ENTITIES_DIR,
      "migrationsDir": process.env.TYPEORM_MIGRATIONS_DIR,
      "subscribersDir": process.env.TYPEORM_SUBCRIBERS_DIR
   }
}
```

#### Create Providers DataBase
```ts
import { createConnection } from 'typeorm';

console.log(process.env.TYPEORM_TYPE_DATABASE);

export const dataBaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: String(process.env.TYPEORM_TYPE_DATABASE) as 'postgres',
        url: process.env.DATABASE_URL as string,
        synchronize: false,
        logging: false,
        entities: [`${__dirname}/../entity/**/*{.js,.ts}`] as string[],
        migrations: [`${__dirname}/../migration/**/*{.js,.ts}`] as string[],
        subscribers: [`${__dirname}/../subscriber/**/*{.js,.ts}`] as string[],
        cli: {
          entitiesDir: process.env.TYPEORM_ENTITIES_DIR as string,
          migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR as string,
          subscribersDir: process.env.TYPEORM_SUBSCRIBERS_DIR as string,
        },
      }),
  },
];
```

#### Create Module DataBase
```ts
import { Module } from '@nestjs/common';
import { dataBaseProviders } from './database.providers';

@Module({
  providers: [...dataBaseProviders],
  exports: [...dataBaseProviders],
})
export class DatabaseModule {}
```

#### Import Provider DataBase Module in AppModuleRoot
```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [DatabaseModule, ProdutoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

#### Inject Provide I Provide
```ts
import { Produto } from './../entity/Produto';
import { Connection } from 'typeorm';
export const produtoProviders = [
  {
    provide: 'REPOSITORY_PRODUTO',
    useFactory: (connection: Connection) => connection.getRepository(Produto),
    inject: ['DATABASE_CONNECTION'],
  },
];
```

#### Inject Provide In Service
```ts
import { ProductFindById } from './type/product-findById.type';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProdutoInterface } from './../interface/produto.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProdutoCreateDto } from './dto/produto-create.dto';

@Injectable()
export class ProdutoService {
  private logger: Logger = new Logger();

  constructor(
    @Inject('REPOSITORY_PRODUTO')
    private produtoRepository: Repository<ProdutoInterface>,
  ) {}

  public async findOne(
    productFindById: ProductFindById,
  ): Promise<ProdutoInterface | Error> {
    try {
      const produto = await this.produtoRepository.findOne({
        id: productFindById,
      });
      return produto;
    } catch (err) {
      this.logger.log(err.message);
      return err;
    }
  }
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

import { Produto } from './../entity/Produto';
import { Connection } from 'typeorm';
export const produtoProviders = [
  {
    provide: 'REPOSITORY_PRODUTO',
    useFactory: (connection: Connection) => connection.getRepository(Produto),
    inject: ['DATABASE_CONNECTION'],
  },
];

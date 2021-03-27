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

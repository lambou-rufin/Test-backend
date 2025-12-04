import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Ticket } from './resources/ticket/entities/ticket.entity';


const entities = [
  Ticket
];

export const createRepositoryProvider = (entities: Function[]) => {
  return entities.map((entity) => ({
    provide: `${entity.name.toUpperCase()}_REPOSITORY`,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
    inject: ['DATA_SOURCE'],
  }));
};

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASS'),
        database: configService.get<string>('DATABASE_NAME'),
        synchronize: true,
        entities,
        logging: true, // ⚡ active logs pour voir les requêtes SQL
      });

      await dataSource.initialize(); // très important !
      console.log('[DatabaseProvider] DataSource initialized');
      return dataSource;
    },
  },
  ...createRepositoryProvider(entities),
];

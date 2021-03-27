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

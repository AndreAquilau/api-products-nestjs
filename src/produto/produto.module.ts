import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { produtoProviders } from './produto.providers';
import { ProdutoService } from './produto.service';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService, ...produtoProviders],
  exports: [...produtoProviders],
  imports: [DatabaseModule],
})
export class ProdutoModule {}

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

  public async findAll(): Promise<ProdutoInterface[] | Error> {
    try {
      const produtos = await this.produtoRepository.find();
      return produtos;
    } catch (err) {
      this.logger.log(err.message);
      return err;
    }
  }

  public async createProduct(
    produtoCreateDto: ProdutoCreateDto,
  ): Promise<void | Error> {
    try {
      await this.produtoRepository.save(produtoCreateDto);
    } catch (err) {
      this.logger.log(err.message);
      return err;
    }
  }

  public async deleteProduct(
    productFindById: ProductFindById,
  ): Promise<void | Error> {
    try {
      const product = await this.produtoRepository.findOne({
        id: productFindById,
      });
      await this.produtoRepository.delete({ id: product.id });
    } catch (err) {
      this.logger.log(err.message);
      return err;
    }
  }

  public async updateProduct(
    productFindById: ProductFindById,
    productUpdateDto: ProductUpdateDto,
  ): Promise<void | Error> {
    try {
      const product = await this.produtoRepository.findOne({
        id: productFindById,
      });
      await this.produtoRepository.update({ id: product.id }, productUpdateDto);
    } catch (err) {
      this.logger.log(err.messsage);
      return err;
    }
  }
}

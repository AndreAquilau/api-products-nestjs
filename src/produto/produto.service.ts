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
      ///console.log(produtos);
      return produtos;
    } catch (err) {
      this.logger.log(err.message);
      return err;
    }
  }

  public async createProduct(
    produtoCreateDto: ProdutoCreateDto,
  ): Promise<any | Error> {
    try {
      let product: ProdutoInterface;

      await this.produtoRepository
        .save(produtoCreateDto)
        .then((res) => (product = res));
      return product;
    } catch (err) {
      this.logger.log(err.message);
      return err;
    }
  }

  public async deleteProduct(
    productFindById: ProductFindById,
  ): Promise<void | Error> {
    try {
      let product: ProdutoInterface;

      await this.produtoRepository
        .findOne({
          id: productFindById,
        })
        .then((res) => (product = res));

      await this.produtoRepository.delete({ id: product.id });
    } catch (err) {
      this.logger.log(err.message);
      return err;
    }
  }

  public async updateProduct(
    productFindById: ProductFindById,
    productUpdateDto: ProductUpdateDto,
  ): Promise<any | Error> {
    try {
      const product: ProdutoInterface = this.produtoRepository.create(
        productUpdateDto,
      );

      const productFill = await this.produtoRepository.findOne({
        id: productFindById,
      });

      //console.log(productFill);

      const res = await this.produtoRepository.update(
        { id: productFill.id },
        product,
      );

      console.log(res);

      return product;
    } catch (err) {
      this.logger.log(err.messsage);
      return err;
    }
  }
}

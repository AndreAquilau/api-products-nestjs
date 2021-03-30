import { ProductFindById } from './type/product-findById.type';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProdutoService } from './produto.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Logger,
  HttpStatus,
  Query,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { ProdutoCreateDto } from './dto/produto-create.dto';

@Controller('products')
export class ProdutoController {
  logger: Logger = new Logger();

  constructor(private produtoService: ProdutoService) {}
  @Get()
  async findAll(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const produtos = await this.produtoService.findAll();
      return response.status(HttpStatus.OK).json([produtos]).end();
    } catch (err) {
      this.logger.log(err.message);
      return response
        .status(HttpStatus.EXPECTATION_FAILED)
        .json([{ message: err.message }])
        .end();
    }
  }

  @Get(':id')
  public async findOne(
    @Param('id')
    productFindById: ProductFindById,
    @Res()
    response: Response,
  ): Promise<any> {
    try {
      const produto = await this.produtoService.findOne(productFindById);
      return response.status(HttpStatus.OK).json([produto]).end();
    } catch (err) {
      this.logger.log(err.message);
      return response
        .status(HttpStatus.EXPECTATION_FAILED)
        .json([{ message: err.message }])
        .end();
    }
  }

  @Post()
  public async createProduct(
    @Body()
    productCreateDto: ProdutoCreateDto,
    @Res()
    response: Response,
  ): Promise<any> {
    try {
      const product = await this.produtoService.createProduct(productCreateDto);
      return response.status(HttpStatus.CREATED).json(product).end();
    } catch (err) {
      this.logger.log(err.message);
      return response
        .status(HttpStatus.EXPECTATION_FAILED)
        .json([{ message: err.message }])
        .end();
    }
  }

  @Put(':id')
  public async updateProduct(
    @Req()
    request: { params: { id: ProductFindById }; body: ProductUpdateDto },
    @Res() response: Response,
  ): Promise<any> {
    try {
      const { body, params } = request;

      //console.log(body);
      //console.log(params);
      const product = await this.produtoService.updateProduct(params.id, body);
      return response.status(HttpStatus.OK).json(product).end();
    } catch (err) {
      this.logger.log(err.message);
      response
        .status(HttpStatus.EXPECTATION_FAILED)
        .json([{ message: err.message }])
        .end();
    }
  }

  @Delete(':id')
  public async deleteProduct(
    @Param('id')
    productFindById: ProductFindById,
    @Res()
    response: Response,
  ): Promise<any> {
    try {
      await this.produtoService.deleteProduct(productFindById);
      response.status(HttpStatus.OK).end();
    } catch (err) {
      this.logger.log(err.message);
      return response
        .status(HttpStatus.OK)
        .json([{ message: err.message }])
        .end();
    }
  }
}

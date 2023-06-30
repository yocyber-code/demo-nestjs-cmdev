import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStockDto } from './dto/create-stock-dto';
import { ResponseModel } from 'src/model/responseModel';
import * as fsExtra from 'fs-extra';
import { Product } from './product.entity';
import { query } from 'express';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async createProduct(
    createStockDto: CreateStockDto,
    imageFileName: string,
  ): Promise<ResponseModel> {
    const product = await this.productRepository.createProduct(
      createStockDto,
      imageFileName,
    );
    const resp: ResponseModel = {
      result: [product],
    };
    return resp;
  }

  async getAllProduct(): Promise<ResponseModel> {
    const products = await this.productRepository.find({
      order: { id: 'DESC' },
    });
    const resp: ResponseModel = { result: products };
    return resp;
  }

  async getProductById(id: number): Promise<ResponseModel> {
    const product = await this.productRepository.findOneBy({ id: id });
    if (product) {
      const resp: ResponseModel = { result: [product] };
      resp.status = 200;
      resp.message = 'successful';
      return resp;
    }
    throw new BadRequestException(`Product with ID ${id} not found`);
  }

  async getProductByKeyword(keyword: string): Promise<ResponseModel> {
    if(keyword){
      const query = this.productRepository.createQueryBuilder('product')
      query.where('product.name like :keyword', {keyword: `%${keyword}%`})
      const products = await query.getMany();
      const resp: ResponseModel = { result: products };
      resp.status = 200;
      resp.message = 'successful';
      return resp;
    }
    return await this.getAllProduct();
  }

  async updateProduct(
    id: number,
    createStockDto: CreateStockDto,
    imageFileName: string,
  ): Promise<ResponseModel> {
    const product = await this.productRepository.findOneBy({ id: id });
    if (product) {
      fsExtra.remove(`./static/upload/images${product.image}`);
      product.name = createStockDto.name;
      product.price = createStockDto.price;
      product.stock = createStockDto.stock;
      product.image = imageFileName;
      await product.save();
      const resp: ResponseModel = { result: [product] };
      resp.status = 200;
      resp.message = 'successful';
      return resp;
    }
    throw new BadRequestException(`Product with ID ${id} not found`);
  }

  async deleteProduct(id: number): Promise<any> {
    const product = await this.productRepository.findOneBy({ id: id });
    if (product) {
      fsExtra.remove(`./static/upload/images${product.image}`);
      return await this.productRepository.delete({ id: id });
    }
    throw new BadRequestException(`Product with ID ${id} not found`);
  }
}

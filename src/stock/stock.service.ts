import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStockDto } from './dto/create-stock-dto';
import { ResponseModel } from 'src/model/responseModel';
import { Product } from './product.entity';

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
    const product = await this.productRepository.createProduct(createStockDto,imageFileName);
    const resp: ResponseModel = {
      result: [product],
    };
    return resp;
  }

  async getAllProduct(): Promise<ResponseModel> {
    const products = await this.productRepository.find();
    const resp: ResponseModel = { result: products };
    return resp;
  }
}

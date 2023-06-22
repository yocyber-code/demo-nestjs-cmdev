import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStockDto } from './dto/create-stock-dto';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(
    @InjectRepository(Product)
    repository: Repository<Product>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createProduct(
    createStockDto: CreateStockDto,
    imageFileName: string,
  ): Promise<Product> {
    const { name, price, stock } = createStockDto;
    console.log(createStockDto);

    const product: Product = new Product();
    product.name = name;
    product.price = price;
    product.stock = stock;
    product.image = imageFileName;
    await product.save();

    return product;
  }
}

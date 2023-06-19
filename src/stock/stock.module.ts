import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [StockController],
  providers:[ProductRepository],
})
export class StockModule {}

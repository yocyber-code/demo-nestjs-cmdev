import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock-dto';
import { ChangeStringCasePipe } from 'src/pipe/change-string-case/change-string-case.pipe';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';

@Controller('stock')
export class StockController {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}
  @Get('/all')
  async getStocks() {
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'This is a custom message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );
    return await this.productRepository.find();
  }

  @Get('/:id')
  getStocksById(@Param('id') id: number) {
    return id;
  }

  @Delete('/:id')
  deleteStocksById(@Param('id') id: number) {
    return id;
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateStocksById(
    @Param('id') id: number,
    @Body() createStrockDto: CreateStockDto,
  ) {
    const { name, price, stock } = createStrockDto;
    return `${name} ${price}, ${stock} id : ${id}`;
  }

  @Post()
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UsePipes(ChangeStringCasePipe)
  addStock(@Body() createStrockDto: CreateStockDto) {
    const { name, price, stock } = createStrockDto;
    console.log(createStrockDto);

    const product: Product = new Product();
    product.name = name;
    product.price = price;
    product.stock = stock;
    product.save();

    return { status: 1 };
  }
}

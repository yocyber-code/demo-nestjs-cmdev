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
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock-dto';
import { StockService } from './stock.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fsExtra from 'fs-extra';
import { randomUUID } from 'crypto';
import { extname } from 'path';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get('/all')
  async getStocks() {
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'This is a custom message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );
    const response = await this.stockService.getAllProduct();
    response.status = HttpStatus.OK;
    response.message = 'successful';
    return response;
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = randomUUID();
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  // @UsePipes(ChangeStringCasePipe)
  async addStock(
    @Body() createStockDto: CreateStockDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileImage = file.filename;
    const response = await this.stockService.createProduct(createStockDto,fileImage);
    response.status = HttpStatus.OK;
    response.message = 'create successful';
    // fsExtra.move(file.path, `upload/${response.result[0].id}.${fileExtention}`);
    return response;
  }
}

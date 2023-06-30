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
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock-dto';
import { StockService } from './stock.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fsExtra from 'fs-extra';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { ResponseModel } from 'src/model/responseModel';
import { LoggerInterceptor } from 'src/interceptor/logger/logger.interceptor';
import { MyGuard } from 'src/guard/my/my.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get('/all')
  // @UseInterceptors(LoggerInterceptor)
  // @UseGuards(MyGuard)
  @UseGuards(AuthGuard())
  async getStocks(): Promise<ResponseModel> {
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

  @Get('/keyword')
  async getStocksByKeyword(
    @Query('keyword') keyword: string,
  ): Promise<ResponseModel> {
    const response = await this.stockService.getProductByKeyword(keyword);
    return response;
  }

  @Get('/:id')
  async getStocksById(@Param('id') id: number): Promise<ResponseModel> {
    const resp = await this.stockService.getProductById(id);
    return resp;
  }

  @Delete('/:id')
  async deleteStocksById(@Param('id') id: number): Promise<ResponseModel> {
    return await this.stockService.deleteProduct(id);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/upload/images',
        filename: (req, file, cb) => {
          const randomName = randomUUID();
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateStocksById(
    @Param('id') id: number,
    @Body() createStrockDto: CreateStockDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseModel> {
    const fileImage = file.filename;
    const resp = await this.stockService.updateProduct(
      id,
      createStrockDto,
      fileImage,
    );
    return resp;
  }

  @Post()
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/upload/images',
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
  ): Promise<ResponseModel> {
    const fileImage = file.filename;
    const response = await this.stockService.createProduct(
      createStockDto,
      fileImage,
    );
    response.status = HttpStatus.OK;
    response.message = 'create successful';
    // fsExtra.move(file.path, `upload/${response.result[0].id}.${fileExtention}`);
    return response;
  }
}

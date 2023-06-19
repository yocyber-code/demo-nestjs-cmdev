import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateStockDto } from 'src/stock/dto/create-stock-dto'; 
import * as changeCase from 'change-case'

@Injectable()
export class ChangeStringCasePipe implements PipeTransform {
  transform(value: CreateStockDto, metadata: ArgumentMetadata) {
    console.log('JSON in pipe',JSON.stringify(value));
    value.name = value.name.toUpperCase()
    return value;
  }
}

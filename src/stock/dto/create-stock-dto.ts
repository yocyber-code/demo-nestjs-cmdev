import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateStockDto {
  @IsNotEmpty()
  // @Length(10)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;
}

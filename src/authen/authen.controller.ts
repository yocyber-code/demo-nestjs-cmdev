import { Body, Controller, HttpCode, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { UserCredentialDto } from './dto/user-credential.dto';
import { CreateUserCredentialDto } from './dto/createUser-credential.dto copy';
import { AuthResponseModel, ResponseModel } from 'src/model/responseModel';
import { AuthGuard } from '@nestjs/passport';
import { GetUsername } from './get-username.decorator';

@Controller('authen')
export class AuthenController {
  constructor(private authenService: AuthenService) {}

  @Post('/login')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async login(@Body() userCredentialDto: UserCredentialDto) : Promise<AuthResponseModel> {
    return await this.authenService.login(userCredentialDto);
  }

  @Post('/register')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  register(@Body() userCredentialDto: CreateUserCredentialDto): Promise<ResponseModel> {
    const resp = this.authenService.register(userCredentialDto);
    console.log('regiser',userCredentialDto);
    return resp;
  }

  @Post('/test')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async test(@Req() req , @GetUsername() username) : Promise<any> {
    // console.log(req);
    // return req.user.username;
    return username;
  }
}

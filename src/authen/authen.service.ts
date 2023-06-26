import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserCredentialDto } from './dto/createUser-credential.dto copy';
import { AuthResponseModel, ResponseModel } from 'src/model/responseModel';
import { UserCredentialDto } from './dto/user-credential.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(userCredential: UserCredentialDto): Promise<AuthResponseModel> {
    const username = await this.userRepository.validateUserPassword(
      userCredential,
    );
    if (username) {
      const payload = { username };
      const token = this.jwtService.sign(payload, { algorithm: 'HS256' });
      const refresh_token = this.jwtService.sign(payload, {});
      return { status: 200, token: token };
    }
    return { status: 401, token: null };
  }

  async register(
    createUserCredential: CreateUserCredentialDto,
  ): Promise<ResponseModel> {
    const { password, confirm_password } = createUserCredential;
    if (password !== confirm_password) {
      throw new BadRequestException('password not match');
    }
    const user = await this.userRepository.createUser(createUserCredential);
    return { result: [user] };
  }
}

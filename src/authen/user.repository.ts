import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserCredentialDto } from './dto/createUser-credential.dto copy';
import * as bcrypt from 'bcrypt';
import { UserCredentialDto } from './dto/user-credential.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async validateUserPassword(
    userCredential: UserCredentialDto,
  ): Promise<string|null> {
    const { username, password } = userCredential;
    const user = await this.findOneBy({ username: username });
    if(user && await user.validatePassword(password)){
      return user.username;
    }
    return null;
  }

  async createUser(
    createUserCredential: CreateUserCredentialDto,
  ): Promise<User> {
    const { username, password } = createUserCredential;
    const salt = bcrypt.genSaltSync();
    const user: User = new User();
    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;
    try {
      await user.save();
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('username already exists');
      }
    }

    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

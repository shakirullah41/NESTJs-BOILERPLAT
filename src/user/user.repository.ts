import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, ILike, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from '../auth/dto/signup.dto';
import { OauthSignUpDto } from '../auth/dto/oauth.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    // type promise bcz it is an asyn method
    const { name, phone, email, password } = signUpDto;
    const user = new User();
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    if (await this.findOne({ where: { email } })) {
      throw new ConflictException('Email already exist!');
    }
    try {
      await user.save();
    } catch (e) {
      if (['23505', '23503', '23502', '23514'].includes(e.code)) {
        throw new ConflictException(e.detail);
      } else {
        throw new InternalServerErrorException(e);
      }
    }
    delete user.password;
    delete user.salt;
    return user;
  }
  // async OauthsignUp(oauthSignUpDto: OauthSignUpDto): Promise<User> {
  //   const { firstname, lastname, email } = oauthSignUpDto;
  //   const user = new User();
  //   user.firstname = firstname;
  //   user.lastname = lastname;
  //   user.email = email;
  //   try {
  //     await user.save();
  //   } catch (e) {
  //     if (['23505', '23503', '23502', '23514'].includes(e.code)) {
  //       throw new ConflictException(e.detail);
  //     } else {
  //       throw new InternalServerErrorException(e);
  //     }
  //   }
  //   delete user.password;
  //   delete user.salt;
  //   return user;
  // }
  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { email, password } = authCredentialsDto;
    let where: any = { email: ILike(email) };
    const user = await this.findOne({ where });
    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

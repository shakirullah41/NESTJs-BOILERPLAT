import { Injectable, NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { OauthSignUpDto } from '../auth/dto/oauth.dto';
import { SignUpDto } from '../auth/dto/signup.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return found;
  }
  async signUp(signUpDto: SignUpDto): Promise<User> {
    return this.userRepository.signUp(signUpDto);
  }
  async oauthSignUp(oauthSignUpDto: OauthSignUpDto): Promise<User> {
    return this.userRepository.OauthsignUp(oauthSignUpDto);
  }
  async getUserByEmail(email: string, isNotValidate?): Promise<User> {
    const found = await this.userRepository.findOne({
      where: { email: ILike(email) },
    });
    if (!found && !isNotValidate) {
      throw new NotFoundException(`User with EMAIL "${email}" not found`);
    }
    return found;
  }
  updateUserToken(id, accessToken, refreshToken) {
    return this.userRepository.updateUserToken(id, accessToken, refreshToken);
  }
  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    return this.userRepository.validateUserPassword(authCredentialsDto);
  }
}

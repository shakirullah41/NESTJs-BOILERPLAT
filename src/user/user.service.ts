import { Injectable, NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { OauthSignUpDto } from '../auth/dto/oauth.dto';
import { SignUpDto } from '../auth/dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    return this.userRepository.validateUserPassword(authCredentialsDto);
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto, files) {
    try {
      const user = await this.getUserById(id);

      // Update user properties from DTO
      Object.assign(user, updateUserDto);

      if (files) {
        const { proofOfHomeAddress, uploadedId, proofOfBusiness, proofOfBank } =
          files;
        // Handle file uploads and update corresponding fields
        if (proofOfHomeAddress) {
          user.proofOfHomeAddress = proofOfHomeAddress.buffer; // Store file data as needed
        }

        if (uploadedId) {
          user.uploadedId = uploadedId.buffer; // Store file data as needed
        }

        if (proofOfBank) {
          user.proofOfBank = proofOfBank.buffer; // Store file data as needed
        }
        if (proofOfBusiness) {
          user.proofOfBusiness = proofOfBusiness.buffer; // Store file data as needed
        }
      }
      return this.userRepository.save(user);
    } catch (e) {
      console.log(e);
    }
  }
}

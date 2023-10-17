import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('proofOfHomeAddress'))
  @UseInterceptors(FileInterceptor('uploadedId'))
  @UseInterceptors(FileInterceptor('proofOfBank'))
  @UseInterceptors(FileInterceptor('proofOfBusiness'))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() proofOfHomeAddress: Express.Multer.File,
    @UploadedFile() uploadedId: Express.Multer.File,
    @UploadedFile() proofOfBank: Express.Multer.File,
    @UploadedFile() proofOfBusiness: Express.Multer.File,
  ) {
    return this.userService.updateUser(
      +id,
      updateUserDto,
      proofOfHomeAddress,
      uploadedId,
      proofOfBusiness,
      proofOfBank,
    );
  }
}

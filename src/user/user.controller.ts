import {
  Body,
  Controller,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Put(':id')
  @UseInterceptors(FileInterceptor('proofOfHomeAddress'))
  @UseInterceptors(FileInterceptor('uploadedId'))
  @UseInterceptors(FileInterceptor('proofOfBank'))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() proofOfHomeAddress: Express.Multer.File,
    @UploadedFile() uploadedId: Express.Multer.File,
    @UploadedFile() proofOfBank: Express.Multer.File,
  ) {
    return this.userService.updateUser(
      +id,
      updateUserDto,
      proofOfHomeAddress,
      uploadedId,
      proofOfBank,
    );
  }
}

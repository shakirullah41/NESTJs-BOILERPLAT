import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'proofOfHomeAddress' },
      { name: 'uploadedId' },
      { name: 'proofOfBank' },
      { name: 'proofOfBusiness' },
    ]),
  )
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles()
    files: {
      proofOfHomeAddress?: Express.Multer.File[];
      uploadedId?: Express.Multer.File[];
      proofOfBank?: Express.Multer.File[];
      proofOfBusiness?: Express.Multer.File[];
    },
  ) {
    return this.userService.updateUser(+id, updateUserDto, files);
  }
}

import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { parse } from 'csv-parse';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import * as fs from 'fs';
import { CsvParser } from 'nest-csv-parser';
import { Model } from 'mongoose';
import { userDocument } from '../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectModel('user') private readonly userModel: Model<userDocument>,
  ) {}

  @Post('user')
  async createUser(@Body() userDto: UserDto): Promise<void> {
    await this.userService.registerUser(userDto);
  }

  @Post('logInUser')
  async logInUser(@Body() dto: LoginDto): Promise<void> {
    await this.userService.logIn(dto);
  }

  @Get('verify/:token')
  async verify(@Param('token') token: string): Promise<void> {
    await this.userService.emailVerification(token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('updateUser/:userId')
  async updateUser(
    @Body() userDto: UserDto,
    @Param('userId') userId: string,
  ): Promise<void> {
    await this.userService.userUpdate(userDto, userId);
  }

  @Post('forgotPassword')
  async forgotPasswordB(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void> {
    await this.userService.forgotPassword(forgotPasswordDto.email);
  }

  @Patch('resetPassword/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    await this.userService.resetPassword(resetPasswordDto, token);
  }

  @Post('bulkImport')
  @UseInterceptors(FileInterceptor('file'))
  async bulkImport(@UploadedFile() file) {
    const rows: any = await this.getParsedCsv(file);
    const headers = rows.shift();
    const data = rows.map((row) => ({
      [headers[0]]: row[0],
      [headers[1]]: row[1],
      [headers[2]]: row[2],
      [headers[3]]: row[3],
    }));

    return data.map((docs) => this.userModel.create(docs));
  }

  private async getParsedCsv(file) {
    const result = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(file.originalname)
        .pipe(parse({ from_line: 1 }))
        .on('data', (row) => {
          result.push(row);
        })
        .on('end', () => {
          resolve(result);
        })
        .on('error', reject);
    });
  }
}

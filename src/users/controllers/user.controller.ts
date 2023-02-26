/* eslint-disable prettier/prettier */
import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import * as fastify from 'fastify';
import { Multipart } from 'fastify-multipart';
import * as csv from 'csv-parser';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { Model } from 'mongoose';
import { userDocument } from '../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectModel('user') private readonly userModel: Model<userDocument>,
  ) {}

  @Post('user')
  async createUser(@Body() userDto: UserDto): Promise<void> {
    return this.userService.registerUser(userDto);
  }

  @Post('logInUser')
  async logInUser(@Body() dto: LoginDto): Promise<void> {
    return this.userService.logIn(dto);
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
  public async bulkImport(
    @Req() req: fastify.FastifyRequest,
  ) {
    const data: any = await this.getParsedCsv(req);

    return data.map((docs) => this.userModel.create(docs));
  }

  private async getParsedCsv(req) {
      const result = [];
      const uploadedFile: Multipart<true> = await req.file();

      return new Promise((resolve, reject) => {
        uploadedFile.file
          .pipe(csv())
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

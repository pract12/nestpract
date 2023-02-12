import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}

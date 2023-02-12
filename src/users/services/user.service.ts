import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userDocument } from '../schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { environment } from 'src/environment/environment';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<userDocument>,
    private jwtService: JwtService,
  ) {}

  async registerUser(userDto: UserDto): Promise<any> {
    const user: UserDto = await this.userModel.findOne({
      email: userDto.email,
    });
    if (user) {
      throw new HttpException(
        `user already found from this ${user.email}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser: UserDto = await this.userModel.create({
      ...userDto,
      password: hashedPassword,
    });
    const payload = { email: newUser.email };
    const accessToken = this.jwtService.sign(payload);
    await this.sendVerificationLink(userDto.email);

    return accessToken;
  }

  public sendVerificationLink(email: string) {
    const payload = { email };
    const token = this.jwtService.sign(payload);
    const url = environment.verificationUrl + `/${token}`;
    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    return this.sendMail(email, text);
  }

  async sendMail(email: string, text: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: environment.user,
        pass: environment.password,
      },
    });
    await transporter.sendMail({
      from: environment.user,
      to: email,
      subject: 'Email Verification',
      text: text,
    });
  }

  async emailVerification(token: string): Promise<any> {
    try {
      const tokenVerification = this.jwtService.verify(token);

      return await this.userModel.findOneAndUpdate(
        {
          email: tokenVerification.email,
        },
        {
          $set: {
            isEmailValid: true,
          },
        },
      );
    } catch (err) {
      if (err?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
  async logIn(dto: LoginDto): Promise<any> {
    const user: LoginDto = await this.userModel.findOne({ email: dto.email });
    if (!user) {
      throw new HttpException(
        `user not found from this ${user.email}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const isPasswordMatching: boolean = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }

  async forgotPassword(email: string): Promise<void> {
    const existedEmail = await this.userModel.findOne({ email: email });
    if (!existedEmail) {
      throw new HttpException(
        'user not found from this email ',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { email };
    const token = this.jwtService.sign(payload);

    const url = environment.verificationUrl + `/${token}`;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: environment.user,
        pass: environment.password,
      },
    });

    await transporter.sendMail({
      from: environment.user,
      to: email,
      subject: 'Forget Password',
      text: `For reset tour password click here: ${url}  `,
    });
  }

  async resetPassword(
    resetPassword: ResetPasswordDto,
    token: string,
  ): Promise<any> {
    try {
      const tokenVerification = this.jwtService.verify(token);
      const hashedPassword = await bcrypt.hash(resetPassword.plainPassword, 10);
      await this.userModel.findOneAndUpdate(
        {
          email: tokenVerification.email,
          isEmailValid: true,
        },
        {
          $set: {
            password: hashedPassword,
          },
        },
      );
    } catch (err) {
      if (err?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  async userUpdate(dto: UserDto, userId: string): Promise<UserDto> {
    const user: UserDto = await this.userModel.findById({ _id: userId });
    if (!user) {
      throw new HttpException(
        'user not found from this userId ',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: userId },
        dto,
        {
          new: true,
        },
      );

      return updatedUser;
    }
  }
}

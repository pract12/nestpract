import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';

export class PostDto {
  // @IsString()
  // @IsNotEmpty()
  userId: string;

  // @IsString()
  // @IsNotEmpty()
  title: string;

  // @IsEmail()
  // @IsNotEmpty()
  body: string;
}

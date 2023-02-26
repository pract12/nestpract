import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';

export class UpdateCommentDto {
  // @IsString()
  // @IsNotEmpty()
  name: string;

  // @IsEmail()
  // @IsNotEmpty()
  email: string;
  body: string;
}

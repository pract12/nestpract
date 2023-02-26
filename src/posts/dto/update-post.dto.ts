import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';

export class UpdatePostDto {
  // @IsString()
  // @IsNotEmpty()
  title: string;

  // @IsEmail()
  // @IsNotEmpty()
  body: string;
}

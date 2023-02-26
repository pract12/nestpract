import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';

export class TodoDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  completed: boolean;
}

import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  completed: string;
}

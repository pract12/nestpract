import { IsString, IsNotEmpty } from 'class-validator';
export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  readonly plainPassword: string;
}

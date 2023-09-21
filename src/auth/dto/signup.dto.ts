import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SingUpDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'email of user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345', description: 'password of user' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'alex', description: 'a name of user' })
  @IsNotEmpty()
  @IsString()
  name: string;
}

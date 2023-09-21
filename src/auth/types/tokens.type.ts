import { ApiProperty } from '@nestjs/swagger';

export class Tokens {
  @ApiProperty({
    description: 'JWT access',
    example: 'salkdaskljfasklj.asdlkfjaldjf.lkasdjfljasdf',
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh',
    example: 'salkdaskljfasklj.asdlkfjaldjf.lkasdjfljasdf',
  })
  refreshToken: string;
}

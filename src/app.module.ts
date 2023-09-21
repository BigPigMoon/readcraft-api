import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [PrismaService, AuthService],
})
export class AppModule {
}

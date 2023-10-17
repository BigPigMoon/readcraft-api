import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [AuthModule, PrismaModule, BookModule, CardModule],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }],
})
export class AppModule {}

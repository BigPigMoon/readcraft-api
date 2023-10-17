import { Module } from '@nestjs/common';
import { CardGateway } from './card.gateway';

@Module({
  providers: [CardGateway],
})
export class CardModule {}

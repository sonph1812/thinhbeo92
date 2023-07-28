import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TierModelModule } from 'src/app-module/tier-model/tier-model.module';
import { Cart } from 'src/common/entities/cart.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), TierModelModule],
  providers: [CartService],
  exports: [CartService],
  controllers: [CartController],
})
export class CartModule {}

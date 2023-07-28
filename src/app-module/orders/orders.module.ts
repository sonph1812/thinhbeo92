import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/app-module/product/product.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CartModule } from 'src/app-module/cart/cart.module';
import { Orders } from "../../common/entities/orders.entity";
import { OrderProducts } from "../../common/entities/order-products.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, OrderProducts]),
    ProductModule,
    CartModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}

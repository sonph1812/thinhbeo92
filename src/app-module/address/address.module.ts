import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/common/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  exports: [AddressService],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}

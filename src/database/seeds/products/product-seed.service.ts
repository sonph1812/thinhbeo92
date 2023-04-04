import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Product } from "../../../product/entity/product.entity";

@Injectable()
export class ProductSeedService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}

  async run() {

  }
}

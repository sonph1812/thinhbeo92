import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/app-module/shared/services/base.service';
import { Repository } from 'typeorm';
import { Model } from "../../common/entities/model.entity";

@Injectable()
export class ModelService extends BaseService<Model, Repository<Model>> {
  constructor(
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
  ) {
    super(modelRepository, 'model');
  }
}

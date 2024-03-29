import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/app-module/shared/services/base.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { OrderTierModelDto } from 'src/app-module/orders/dto/create-order.dto';
import { ModelService } from 'src/app-module/model/model.service';
import { TierModel } from "../../common/entities/tier-model.entity";
import { Model } from "../../common/entities/model.entity";

@Injectable()
export class TierModelService extends BaseService<
  TierModel,
  Repository<TierModel>
> {
  constructor(
    @InjectRepository(TierModel)
    private repositoryTierModel: Repository<TierModel>,
    @InjectRepository(Model)
    private repositoryModel: Repository<Model>,
    private readonly modelService: ModelService,
  ) {
    super(repositoryTierModel, 'tier-model');
  }

  async purchaseProduct(quantity: number, tierModels: OrderTierModelDto[]) {
    try {
      if (tierModels.length < 2) {
        const tierModel = tierModels[0];
        const model = await this.modelService.findOne({
          id: tierModel.modelId,
        });
        if (model.stock - quantity < 0) {
          throw new BadRequestException('Product sold out');
        }
        await this.repositoryModel.update(tierModel.modelId, {
          stock: () => `stock - ${quantity}`,
          sold: () => `sold + ${quantity}`,
        });
      } else if (tierModels.length === 2) {
        const parentTierModel = tierModels[0];
        const tierModel = tierModels[1];
        const where: FindOptionsWhere<Model> = {
          id: tierModel.modelId,
          parent: parentTierModel.tierModelId,
        };
        const model = await this.modelService.findOne(where);
        if (model.stock - quantity < 0) {
          throw new BadRequestException('Product sold out');
        }
        await this.repositoryModel.update(where, {
          stock: () => `stock - ${quantity}`,
          sold: () => `sold + ${quantity}`,
        });
      }
    } catch (error) {
      throw error;
    }
  }
}

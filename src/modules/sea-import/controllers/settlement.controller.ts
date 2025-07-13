import { Body, Controller, Post } from '@nestjs/common';
import { CalculateSettlementUseCase } from '../../../application/use-cases/calculate-settlement.usecase';
import { CalculateSettlementInput } from '../../../application/use-cases/calculate-settlement.usecase';

@Controller('sea-import/settlement')
export class SettlementController {
  constructor(private readonly calculate: CalculateSettlementUseCase) {}

  @Post()
  async create(@Body() body: CalculateSettlementInput) {
    return this.calculate.execute(body);
  }
}

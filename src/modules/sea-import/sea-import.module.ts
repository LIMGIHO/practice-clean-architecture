import { Module } from '@nestjs/common';
import { SettlementController } from './controllers/settlement.controller';
import { InMemorySettlementRepository } from '../../infrastructure/persistence/in-memory/settlement.repository.impl';
import { CalculateSettlementUseCase } from '../../application/use-cases/calculate-settlement.usecase';

@Module({
  controllers: [SettlementController],
  providers: [
    InMemorySettlementRepository,
    { provide: 'SettlementRepository', useExisting: InMemorySettlementRepository },
    CalculateSettlementUseCase,
  ],
})
export class SeaImportModule {}

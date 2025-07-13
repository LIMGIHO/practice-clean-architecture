import { Injectable } from '@nestjs/common';
import { SettlementRepository } from '../../../domain/repositories/settlement.repository';
import { Settlement } from '../../../domain/entities/settlement.entity';

@Injectable()
export class InMemorySettlementRepository implements SettlementRepository {
  private settlements: Settlement[] = [];

  async save(settlement: Settlement): Promise<void> {
    this.settlements.push(settlement);
  }

  async findAll(): Promise<Settlement[]> {
    return this.settlements;
  }
}

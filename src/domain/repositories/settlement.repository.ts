import { Settlement } from '../entities/settlement.entity';

export interface SettlementRepository {
  save(settlement: Settlement): Promise<void>;
  findAll(): Promise<Settlement[]>;
}

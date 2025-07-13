import { Injectable } from '@nestjs/common';
import { SettlementRepository } from '../../domain/repositories/settlement.repository';
import { Settlement, SettlementDetail } from '../../domain/entities/settlement.entity';

export interface CalculateSettlementInput {
  currency: 'KRW' | 'FOREIGN';
  exchangeRate: number; // foreign per KRW
  duty: number;
  vat: number;
  warehousing: number;
  warehousingVat: number;
  freight: number;
}

export interface CalculateSettlementOutput {
  totalKrw: number;
  totalForeign: number;
}

@Injectable()
export class CalculateSettlementUseCase {
  constructor(private readonly repo: SettlementRepository) {}

  async execute(input: CalculateSettlementInput): Promise<CalculateSettlementOutput> {
    const rate = input.exchangeRate;
    const wh = input.warehousing * 1.1; // add 10%
    const freight = input.freight * 1.1; // add 10%

    const toForeign = (krw: number) => parseFloat((krw / rate).toFixed(2));
    const toKrw = (foreign: number) => parseFloat((foreign * rate).toFixed(2));

    let dutyKrw: number, dutyForeign: number;
    let vatKrw: number, vatForeign: number;
    let whKrw: number, whForeign: number;
    let whVatKrw: number, whVatForeign: number;
    let freightKrw: number, freightForeign: number;

    if (input.currency === 'KRW') {
      dutyKrw = input.duty;
      vatKrw = input.vat;
      whKrw = wh;
      whVatKrw = input.warehousingVat;
      freightKrw = freight;

      dutyForeign = toForeign(dutyKrw);
      vatForeign = toForeign(vatKrw);
      whForeign = toForeign(whKrw);
      whVatForeign = toForeign(whVatKrw);
      freightForeign = toForeign(freightKrw);
    } else {
      dutyForeign = input.duty;
      vatForeign = input.vat;
      whForeign = wh;
      whVatForeign = input.warehousingVat;
      freightForeign = freight;

      dutyKrw = toKrw(dutyForeign);
      vatKrw = toKrw(vatForeign);
      whKrw = toKrw(whForeign);
      whVatKrw = toKrw(whVatForeign);
      freightKrw = toKrw(freightForeign);
    }

    const details: SettlementDetail[] = [
      { id: 'duty', description: 'Duty', krwAmount: dutyKrw, foreignAmount: dutyForeign },
      { id: 'vat', description: 'VAT', krwAmount: vatKrw, foreignAmount: vatForeign },
      { id: 'wh', description: 'Warehousing', krwAmount: whKrw, foreignAmount: whForeign },
      { id: 'whVat', description: 'Warehousing VAT', krwAmount: whVatKrw, foreignAmount: whVatForeign },
      { id: 'freight', description: 'Freight', krwAmount: freightKrw, foreignAmount: freightForeign },
    ];

    const totalKrw = dutyKrw + vatKrw + whKrw + whVatKrw + freightKrw;
    const totalForeign = dutyForeign + vatForeign + whForeign + whVatForeign + freightForeign;

    const settlement = new Settlement(Date.now().toString(), totalKrw, totalForeign, details);
    await this.repo.save(settlement);

    return { totalKrw, totalForeign };
  }
}

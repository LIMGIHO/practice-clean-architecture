export interface SettlementDetail {
  id: string;
  description: string;
  krwAmount: number;
  foreignAmount: number;
}

export class Settlement {
  constructor(
    public readonly id: string,
    public readonly totalKrw: number,
    public readonly totalForeign: number,
    public readonly details: SettlementDetail[],
  ) {}
}

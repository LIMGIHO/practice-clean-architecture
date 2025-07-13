export interface InvoiceDetail {
  id: string;
  description: string;
  amount: number;
}

export class Invoice {
  constructor(
    public readonly id: string,
    public readonly confirmDate: Date,
    public readonly totalAmount: number,
    public readonly details: InvoiceDetail[],
  ) {}
}

import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../../domain/repositories/invoice.repository';

@Injectable()
export class GenerateReportUseCase {
  constructor(private readonly invoiceRepo: InvoiceRepository) {}

  async execute(): Promise<{ totalAmount: number }> {
    const invoices = await this.invoiceRepo.findAll();
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    return { totalAmount };
  }
}

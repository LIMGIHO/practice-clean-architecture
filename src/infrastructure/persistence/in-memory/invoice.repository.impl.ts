import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../../../domain/repositories/invoice.repository';
import { Invoice } from '../../../domain/entities/invoice.entity';

@Injectable()
export class InMemoryInvoiceRepository implements InvoiceRepository {
  private invoices: Invoice[] = [];

  async save(invoice: Invoice): Promise<void> {
    this.invoices.push(invoice);
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoices;
  }
}

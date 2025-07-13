import { Injectable } from '@nestjs/common';
import { Invoice, InvoiceDetail } from '../../../domain/entities/invoice.entity';

@Injectable()
export class GlobalSystemService {
  async fetchInvoicesByConfirmDate(date: string): Promise<{ id: string }[]> {
    return [{ id: 'INV001' }];
  }

  async fetchInvoiceDetail(id: string): Promise<Invoice> {
    const details: InvoiceDetail[] = [
      { id: '1', description: 'Item', amount: 100 },
    ];
    return new Invoice(id, new Date(), 100, details);
  }
}

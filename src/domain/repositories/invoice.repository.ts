import { Invoice } from '../entities/invoice.entity';

export interface InvoiceRepository {
  save(invoice: Invoice): Promise<void>;
  findAll(): Promise<Invoice[]>;
}

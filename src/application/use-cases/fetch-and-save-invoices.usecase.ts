import { Injectable } from '@nestjs/common';
import { GlobalSystemService } from '../../infrastructure/external-apis/global-system/global-system.service';
import { InvoiceRepository } from '../../domain/repositories/invoice.repository';

@Injectable()
export class FetchAndSaveInvoicesUseCase {
  constructor(
    private readonly globalSystem: GlobalSystemService,
    private readonly invoiceRepo: InvoiceRepository,
  ) {}

  async execute(confirmDate: string): Promise<void> {
    const list = await this.globalSystem.fetchInvoicesByConfirmDate(confirmDate);
    for (const item of list) {
      const invoice = await this.globalSystem.fetchInvoiceDetail(item.id);
      await this.invoiceRepo.save(invoice);
    }
  }
}

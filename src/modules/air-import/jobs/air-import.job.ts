import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FetchAndSaveInvoicesUseCase } from '../../../application/use-cases/fetch-and-save-invoices.usecase';

@Injectable()
export class AirImportJob {
  constructor(private readonly fetchAndSave: FetchAndSaveInvoicesUseCase) {}

  @Cron('30 3 * * *')
  async handleCron() {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const date = yesterday.toISOString().slice(0, 10);
    await this.fetchAndSave.execute(date);
  }
}

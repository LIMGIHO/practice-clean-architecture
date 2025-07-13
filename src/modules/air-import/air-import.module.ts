import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AirImportJob } from './jobs/air-import.job';
import { AirImportReportController } from './controllers/air-import-report.controller';
import { GlobalSystemService } from '../../infrastructure/external-apis/global-system/global-system.service';
import { InMemoryInvoiceRepository } from '../../infrastructure/persistence/in-memory/invoice.repository.impl';
import { FetchAndSaveInvoicesUseCase } from '../../application/use-cases/fetch-and-save-invoices.usecase';
import { GenerateReportUseCase } from '../../application/use-cases/generate-report.usecase';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AirImportReportController],
  providers: [
    AirImportJob,
    GlobalSystemService,
    InMemoryInvoiceRepository,
    { provide: 'InvoiceRepository', useExisting: InMemoryInvoiceRepository },
    FetchAndSaveInvoicesUseCase,
    GenerateReportUseCase,
  ],
})
export class AirImportModule {}

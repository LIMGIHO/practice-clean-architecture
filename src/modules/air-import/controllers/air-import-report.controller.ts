import { Controller, Get } from '@nestjs/common';
import { GenerateReportUseCase } from '../../../application/use-cases/generate-report.usecase';

@Controller('air-import/report')
export class AirImportReportController {
  constructor(private readonly generateReport: GenerateReportUseCase) {}

  @Get()
  async getReport() {
    return this.generateReport.execute();
  }
}

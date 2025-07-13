import { Module } from '@nestjs/common';
import { AirImportModule } from './modules/air-import/air-import.module';

@Module({
  imports: [AirImportModule],
})
export class AppModule {}

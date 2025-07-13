import { Module } from '@nestjs/common';
import { AirImportModule } from './modules/air-import/air-import.module';
import { SeaImportModule } from './modules/sea-import/sea-import.module';

@Module({
  imports: [AirImportModule, SeaImportModule],
})
export class AppModule {}

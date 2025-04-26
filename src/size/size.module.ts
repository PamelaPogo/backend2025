import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from './size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Size])], // Importamos el módulo TypeOrmModule y le pasamos la entidad Size
  providers: [SizeService],
  controllers: [SizeController]
})
export class SizeModule {}

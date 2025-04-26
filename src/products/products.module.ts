import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Asegúrate de que 'Product' esté importado desde su archivo correspondiente
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}

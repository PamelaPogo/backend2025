import { Controller, Get, Param, Post, Body, Delete, Put, Patch, Query, ValidationPipe } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { Product } from './products.entity';
import { QueryProductDto } from './dto/get-products-query/get-products-query';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(@Query(new ValidationPipe()) query: QueryProductDto): Promise<Product[]> {
    return this.productsService.getAll(query);
  }
  @Get(':id') // Endpoint para obtener un producto por su id
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post() // Endpoint para crear un nuevo producto
  createProduct(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Delete(':id') // Endpoint para eliminar un producto por su id
  async deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productsService.delete(id);
  }

  @Put(':id') // Endpoint para actualizar un producto por su id
  async updateProduct(@Param('id') id: number, @Body() product: Partial<Product>): Promise<Product> {
    return this.productsService.update(id, product);
  }

  @Patch(':id') // Endpoint para actualizar parcialmente un producto por su id
  async partialUpdateProduct(@Param('id') id: number, @Body() product: Partial<Product>): Promise<Product> {
    return this.productsService.update(id, product);
  }
}

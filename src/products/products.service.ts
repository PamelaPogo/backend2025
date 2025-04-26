import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './products.entity';
import { QueryProductDto } from './dto/get-products-query/get-products-query';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  create(product: Product): Promise<Product> {
    return this.productsRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  }

  update(id: number, product: Partial<Product>): Promise<Product> {
    return this.productsRepository.save({ ...product, id });
  }

  updatePartial(id: number, product: Partial<Product>): Promise<Product> {
    return this.productsRepository.save({ ...product, id });
  }

  async findByName(name: string): Promise<Product[]> {
    const products = await this.productsRepository.find({ where: { name: Like(`%${name}%`) } });
    if (products.length === 0) {
      throw new NotFoundException(`No se encontraron productos con el nombre ${name}`);
    }
    return products;
  }

  // Método para manejar la consulta con paginación, filtros y ordenación
  async getAll(query: QueryProductDto): Promise<Product[]> {
    const { limit = 10, page = 1, orderBy = 'name', name, minPrice, maxPrice, minStock } = query;

    // Validaciones para asegurarse de que 'limit' y 'page' sean válidos
    if (limit < 1 || page < 1) {
      throw new BadRequestException('Los parámetros limit y page deben ser mayores que 0');
    }

    if (!['name', 'price', 'stock'].includes(orderBy)) {
      throw new BadRequestException('Campo de orden no válido');
    }

    const queryBuilder = this.productsRepository.createQueryBuilder('product');

    // Filtros condicionales
    if (name) {
      queryBuilder.andWhere('product.name LIKE :name', { name: `%${name}%` });
    }

    if (minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    if (minStock !== undefined) {
      queryBuilder.andWhere('product.stock >= :minStock', { minStock });
    }

    // Ordenación
    queryBuilder.orderBy(`product.${orderBy}`, 'ASC');

    // Paginación
    queryBuilder.skip((page - 1) * limit).take(limit);

    const products = await queryBuilder.getMany();
    return products;
  }
}

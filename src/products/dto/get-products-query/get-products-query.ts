import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  minStock?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10)) // Convertir a entero
  @IsInt()
  @Min(1)
  page?: number = 1;  // Sin la validación @Min(1)

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10)) // Convertir a entero
  @IsInt()
  @Min(1)
  limit?: number = 10;  // Sin la validación @Min(1)

  @IsOptional()
  @IsString()
  orderBy?: string = 'name';  // Orden por nombre por defecto
}

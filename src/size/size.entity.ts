    import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
    import { IsNotEmpty, IsString, IsPositive, IsInt } from 'class-validator';
    import { Product } from 'src/products/products.entity'; // Asegúrate de que la ruta sea correcta

    @Entity()
    export class Size {
        @PrimaryGeneratedColumn()
        id: number;
      
        @Column({ length: 50 })
        @IsNotEmpty()
        @IsString()
        name: string;  // Talla (S, M, L, 30, 32, etc.)
      
        @Column({ type: 'varchar', length: 2 })
        @IsNotEmpty()
        @IsString()
        country_code: string;  // País (US, EC, etc.)

    // Relación de muchos a muchos con Product
    @ManyToMany(() => Product, (product) => product.sizes)
    products: Product[];
    }

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/products/products.entity'; // Asegúrate de que la ruta sea correcta
import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

@Entity()
export class users {
    
    @PrimaryGeneratedColumn('uuid')
    id: string; // UUID

    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    @IsDateString()  // Para que se valide como una fecha en formato ISO
    birthday: string;

    @Column()
    @IsNotEmpty()
    @IsInt()  // Aseguramos que es un número entero
    @Min(10000000)  // Este es un ejemplo de un mínimo para la identificación (puedes ajustarlo según el caso)
    identification: number;

    // Relación de uno a muchos (un usuario puede tener varios productos)
    @OneToMany(() => Product, (product) => product.user)
    products: Product[];
}6

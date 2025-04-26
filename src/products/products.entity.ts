import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { IsNotEmpty, IsString, IsInt, Min, IsDecimal, IsNumber } from 'class-validator';
import { users } from 'src/users/users.entity';
import { Size } from 'src/size/size.entity';  // Asegúrate de que la ruta sea correcta

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  description: string;

  // Relación de muchos a uno (muchos productos pueden pertenecer a un único usuario)
  @ManyToOne(() => users, (user) => user.products)
  user: users;

  // Agregar stock
  @Column()
  @IsInt()
  @Min(0)
  stock: number;

  // Agregar precio
  @Column("decimal", { precision: 10, scale: 2 })
  @IsNumber()
  @Min(0)
  price: number;

  // Relación de muchos a muchos con Size
  @ManyToMany(() => Size)
  @JoinTable()  // Especifica que esta entidad manejará la relación en una tabla intermedia
  sizes: Size[];
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from './users.entity';


@Injectable() // Decorador que indica que esta clase es un servicio
// Este servicio se encargará de la lógica de negocio relacionada con los usuarios
export class UsersService {

    constructor(
        @InjectRepository(users) // Inyectamos el repositorio de User
        private usersRepository: Repository<users>,) {} 
        
        findAll(): Promise<users[]> {
            return this.usersRepository.find(); // Devuelve todos los usuarios
        }
        async findOne(id: string): Promise<users> {
            const user = await this.usersRepository.findOne({
                where: { id },  // Busca el usuario por su ID (que ahora es un string)
            });
    
            if (!user) {
                throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
            }
    
            return user; // Devuelve el usuario si se encuentra
        }    

        create(user: users): Promise<users> {
            return this.usersRepository.save(user); // Guarda un nuevo usuario
        }

        delete(id: string): Promise<void> {
            return this.usersRepository.delete(id).then(() => {}); // Elimina un usuario por su ID
        }
        
        update(id: string, user: Partial<users>): Promise<users> {
            return this.usersRepository.save({ ...user, id }); // Actualiza un usuario por su ID
            
        }
        
        updatePartial(id: string, user: Partial<users>): Promise<users> {
            return this.usersRepository.save({ ...user, id }); // Actualiza parcialmente un usuario por su ID
        }
}

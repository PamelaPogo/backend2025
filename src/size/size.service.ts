import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './size.entity';

@Injectable()
export class SizeService {
    constructor(
        @InjectRepository(Size) // Inyectamos el repositorio de Size
        private sizeRepository: Repository<Size>,
    ) {}
    findAll(): Promise<Size[]> {
        return this.sizeRepository.find(); // Devuelve todos los tamaños
    }
    async findOne(id: number): Promise<Size> {
        const size = await this.sizeRepository.findOne({
            where: { id },  // Busca el tamaño por su ID (que ahora es un string)
        });

        if (!size) {
            throw new NotFoundException(`Tamaño con ID ${id} no encontrado`);
        }

        return size; // Devuelve el tamaño si se encuentra
    }
    create(size: Size): Promise<Size> {
        return this.sizeRepository.save(size); // Guarda un nuevo tamaño
    }       
    
    delete(id: number): Promise<void> {
        return this.sizeRepository.delete(id).then(() => {}); // Elimina un tamaño por su ID
    }

    update(id: number, size: Partial<Size>): Promise<Size> {
        return this.sizeRepository.save({ ...size, id }); // Actualiza un tamaño por su ID
    }
    updatePartial(id: number, size: Partial<Size>): Promise<Size> {
        return this.sizeRepository.save({ ...size, id }); // Actualiza parcialmente un tamaño por su ID
        }
       
        
}

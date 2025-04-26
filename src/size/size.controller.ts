import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './size.entity';
import { Repository } from 'typeorm';

@Controller('size')
export class SizeController {

constructor( 
    @InjectRepository(Size) // Inyectamos el repositorio de Size
    private sizeRepository: Repository<Size>,) {}
    
    @Get() // Endpoint para obtener todos los tamaños   
    findAll(): Promise<Size[]> {  // Devuelve todos los tamaños
        return this.sizeRepository.find(); // Devuelve todos los tamaños
    }
  
    @Get(':id') // Endpoint para obtener un tamaño por su id
    async findOne(@Param('id') id: string): Promise<Size> {
      const size = await this.sizeRepository.findOne({
        where: { id: parseInt(id, 10) } // convertir el id a número
      });
    
      if (!size) {
        throw new NotFoundException(`No se encontró un size con ID ${id}`);
      }
    
      return size;
    }
   
     @Post() // Endpoint para crear un nuevo tamaño
    async createSize(@Body() size: Size): Promise<Size> {
        return this.sizeRepository.save(size); // Guarda un nuevo tamaño
    }

    @Delete(':id') // Endpoint para eliminar un tamaño por su id
    async deleteSize(@Param('id') id: number): Promise<void> {
        return this.sizeRepository.delete(id).then(() => {}); // Elimina un tamaño por su ID
    }

    @Put(':id') // Endpoint para actualizar un tamaño por su id
    async updateSize(@Param('id') id: number, @Body() size: Partial<Size>): Promise<Size> {
        return this.sizeRepository.save({ ...size, id }); // Actualiza un tamaño por su ID
    }

    @Patch(':id') // Endpoint para actualizar parcialmente un tamaño por su id
    async partialUpdateSize(@Param('id') id: number, @Body() size: Partial<Size>): Promise<Size> {
        return this.sizeRepository.save({ ...size, id }); // Actualiza parcialmente un tamaño por su ID
    }
}

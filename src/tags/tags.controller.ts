import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { TagDto } from './dto/tag.dto/tag.dto';
import { Tag } from './tag/tag.interface';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  // Obtener todos los tags
  @Get()
  findAll(): Tag[] {
    return this.tagsService.getAll();
  }

  // Obtener un tag por ID
  @Get(':id')
  findOne(@Param('id') id: string): Tag {
    try {
      return this.tagsService.getId(id);
    } catch (error) {
      throw new HttpException('Tag no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  // Crear un nuevo tag (validación de ID automático con uuidv4)
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() body: TagDto): Tag {
    try {
      const newTag = this.tagsService.insert(body);
      return newTag;
    } catch (error) {
      throw new HttpException('Error al crear el tag', HttpStatus.BAD_REQUEST);
    }
  }

  // Actualizar un tag completamente
  @Put(':id')
  update(@Param('id') id: string, @Body() body: TagDto): Tag {
    try {
      const updatedTag = this.tagsService.update(id, body);
      return updatedTag;
    } catch (error) {
      throw new HttpException('Tag no encontrado para actualizar', HttpStatus.NOT_FOUND);
    }
  }

  // Eliminar un tag
  @Delete(':id')
  remove(@Param('id') id: string): string {
    try {
      const message = this.tagsService.delete(id);
      return message;
    } catch (error) {
      throw new HttpException('Tag no encontrado para eliminar', HttpStatus.NOT_FOUND);
    }
  }

  // Obtener todos los slugs generados
  @Get('extras/slugs')
  getSlugs(): string[] {
    return this.tagsService.getAllSlugs();
  }

  // Actualizar parcialmente un tag
@Patch(':id')
patch(@Param('id') id: string, @Body() body: Partial<TagDto>): Tag {
  try {
    const updatedTag = this.tagsService.patch(id, body);
    return updatedTag;
  } catch (error) {
    throw new HttpException('Tag no encontrado para actualización parcial', HttpStatus.NOT_FOUND);
  }
}

  // Obtener un tag por slug
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string): Tag {
    try {
      return this.tagsService.getBySlug(slug);
    } catch (error) {
      throw new HttpException('Tag no encontrado', HttpStatus.NOT_FOUND);
    }
  }

}

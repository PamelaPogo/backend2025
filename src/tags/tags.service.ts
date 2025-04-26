import { Injectable } from '@nestjs/common';
import { TagDto } from './dto/tag.dto/tag.dto';
import { Tag } from './tag/tag.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TagsService {
  private tags: Tag[] = [];

  // Obtener todos los tags
  getAll(): Tag[] {
    return this.tags;
  }

  // Obtener un tag por ID
  getId(id: string): Tag {
    const tag = this.tags.find((tag) => tag.id === id);
    if (!tag) {
      throw new Error('Tag no encontrado');
    }
    return tag;
  }

  // Insertar un nuevo tag (validación del UUID generado)
  insert(tagDto: TagDto): Tag {
    const tag: Tag = {
      id: uuidv4(),
      name: tagDto.name,
      description: tagDto.description,
      slug: tagDto.slug,
      stock: tagDto.stock,
    };
    this.tags.push(tag);
    return tag;
  }

  // Actualizar un tag completamente
  update(id: string, tagDto: TagDto): Tag {
    const index = this.tags.findIndex((tag) => tag.id === id);
    if (index === -1) {
      throw new Error('Tag no encontrado para actualizar');
    }
    const updatedTag = { ...this.tags[index], ...tagDto };
    this.tags[index] = updatedTag;
    return updatedTag;
  }

  // Eliminar un tag
  delete(id: string): string {
    const index = this.tags.findIndex((tag) => tag.id === id);
    if (index === -1) {
      throw new Error('Tag no encontrado para eliminar');
    }
    this.tags.splice(index, 1);
    return `Tag con id ${id} eliminado con éxito`;
  }

  // Obtener todos los slugs generados
  getAllSlugs(): string[] {
    return this.tags.map((tag) => tag.slug);
  }

  // Actualizar parcialmente un tag
patch(id: string, tagDto: Partial<TagDto>): Tag {
  const index = this.tags.findIndex((tag) => tag.id === id);
  if (index === -1) {
    throw new Error(`Tag con id ${id} no encontrado`);
  }

  const updatedTag = { ...this.tags[index], ...tagDto };
  this.tags[index] = updatedTag;
  return updatedTag;
}
  
    // Obtener un tag por slug
    getBySlug(slug: string): Tag {
      const tag = this.tags.find((tag) => tag.slug === slug);
      if (!tag) {
        throw new Error('Tag no encontrado');
      }
      return tag;



}
}

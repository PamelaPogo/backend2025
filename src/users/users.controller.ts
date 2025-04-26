import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { users } from './users.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {} // Inyectamos el servicio de UsersService
     @Get() // Endpoint para obtener todos los usuarios
     findAll(): Promise<users[]> {
         return this.usersService.findAll();
     }
    
     @Get(':id') // Endpoint para obtener un usuario por su id
     async findOne(@Param('id') id: string): Promise<users> { // id es de tipo string si usas UUID
       return this.usersService.findOne(id);
     }
     @Post() // Endpoint para crear un nuevo usuario
     createUser(@Body() user: users): Promise<users> {
     return this.usersService.create(user);
    }
    @Delete(':id') // Endpoint para eliminar un usuario por su id
    async deleteUser(@Param('id') id: string): Promise<void> {
        return this.usersService.delete(id);} // Llama al método delete del servicio

    @Put(':id') // Endpoint para actualizar un usuario por su id
    async updateUser(@Param('id') id: string, @Body() user: Partial<users>): Promise<users> {
        return this.usersService.update(id, user); // Llama al método update del servicio
    }
   
    @Patch(':id') // Endpoint para actualizar parcialmente un usuario por su id
    async partialUpdateUser(@Param('id') id: string, @Body() user: Partial<users>): Promise<users> {
        return this.usersService.update(id, user); // Llama al método update del servicio

}}

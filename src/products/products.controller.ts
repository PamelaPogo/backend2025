import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get('inventario')
    getHelloInProduct(): string{
        return "Estamos en produccion"
    }
//Recibir un pparametro en la URL
//  @Get(':id')
//  find(@Param() params) {
//    return `Estas consultando el producto ${params.id}`
//  }

//Recibir varios parametros en la URL tipados y desagregados
//    @Get(':id/:size')
//    findWithSize (@Param() params){
//        return `productos con id: ${params.id}, tiene el tamaño size: ${params.size}`
// }

//Desestructurar parametros de URL
//    @Get(':id')
//    find(@Param('id') id:number){
//       return `productos con id: ${id}`
//   }

//Destruccion de 2 parametros
    @Get(':id/:size')
    findWithSize(@Param ('id') id: number, @Param('size') size: string) {
        return `Detalle de producto ${id}, en tamaño ${size}`
    }

//Definir una ruta POST
//    @Post()
//    createProduct(){
//        return 'Estamos atendiendo una solicitud  de tipo Post'
//    }

//Recibir datos de POST
//    @Post()
//    createProduct(@Body() body){
//        return `Creo un producto ${body.name} con descripción ${body.description}`
//    }

//Recibir datos Post del body por su nombre
@Post()
createProduct(
  @Body('name') name: string, 
  @Body('description') description: string
) {
  return `Creo el producto ${name} con descripción ${description}.`;
}
}

import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get('inventario')
    getHelloInProduct(): string{
        return "Estamos en produccion"
    }
//Recibir un pparametro en la URL
    //@Get(':id')
   // find(@Param() params) {
    //    return `Estas consultando el producto ${params.id}`
   //}

//Recibir varios parametros en la URL tipados y desagregados
    @Get(':id/:size')
    findWithSize (@Param('id') id:number, @Param('size') size: string){
        return `productos con id: ${params.id} ////// size: ${params.size}`
}

//Desestructurar parametros de URL
    @Get(':id')
    find(@Param('id') is:number){
        return `productos con id:`
    }

}

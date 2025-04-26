import { Transform, Type } from "class-transformer";
import { IsDate, IsInt, IsString, Matches, Max, MAX, Min } from "class-validator";

export class CustomersDto {
        
    @IsString()
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {message : 'El nombre solo debe contener letras y espacios'})
    name: string;

    @Type(() => Number)
    @IsInt({ message: 'La edad debe ser un número entero válido (sin letras ni decimales)' })
    @Min(0, { message: 'La edad no puede ser negativa' })
    @Max(150, { message: 'La edad no puede ser mayor a 150 años' })
    age: number;

    @Matches(
        /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[0-2])[/](19|20)\d{2}$/,
        { message: 'La fecha debe tener el formato DD/MM/YYYY' }
      )
      @Transform(({ value }) => {
        const [day, month, year] = value.split('/');
        return new Date(`${year}-${month}-${day}`);
      })
      @IsDate({ message: 'La fecha de nacimiento debe ser válida' })
      birthday: Date;
}

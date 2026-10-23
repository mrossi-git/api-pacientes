import {
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
} from 'class-validator';

export class CrearPacienteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @Matches(/^\d{7,20}$/, {
    message: 'El DNI debe contener entre 7 y 20 dígitos',
  })
  dni: string;

  @IsDateString()
  fechaNacimiento: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  obraSocial: string;
}

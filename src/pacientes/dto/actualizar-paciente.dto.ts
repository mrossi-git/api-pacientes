import { PartialType } from '@nestjs/mapped-types';
import { CrearPacienteDto } from './crear-paciente.dto.js';

export class ActualizarPacienteDto extends PartialType(CrearPacienteDto) {}

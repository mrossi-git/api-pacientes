import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { PacientesService } from './pacientes.service.js';
import { CrearPacienteDto } from './dto/crear-paciente.dto.js';
import { ActualizarPacienteDto } from './dto/actualizar-paciente.dto.js';

@Controller('pacientes')
export class PacientesController {
  constructor(
    private readonly service: PacientesService,
  ) {}

  @Post()
  crear(@Body() dto: CrearPacienteDto) {
    return this.service.crear(dto);
  }

  @Get()
  listar() {
    return this.service.listar();
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.service.obtener(id);
  }

  @Put(':id')
  actualizarCompleto(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CrearPacienteDto,
  ) {
    return this.service.actualizar(id, dto);
  }

  @Patch(':id')
  actualizarParcial(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarPacienteDto,
  ) {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.service.eliminar(id);
  }
}
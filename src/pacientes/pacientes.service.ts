import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Paciente } from './entities/paciente.entity.js';
import { CrearPacienteDto } from './dto/crear-paciente.dto.js';
import { ActualizarPacienteDto } from './dto/actualizar-paciente.dto.js';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly repository: Repository<Paciente>,
  ) {}

  async crear(dto: CrearPacienteDto) {
    const existente = await this.repository.findOneBy({
      dni: dto.dni,
    });

    if (existente) {
      throw new ConflictException('El DNI ya está registrado');
    }

    const paciente = this.repository.create(dto);
    return this.repository.save(paciente);
  }

  listar() {
    return this.repository.find({
      order: { id: 'DESC' },
    });
  }

  async obtener(id: number) {
    const paciente = await this.repository.findOneBy({ id });

    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }

    return paciente;
  }

  async actualizar(id: number, dto: ActualizarPacienteDto) {
    const paciente = await this.obtener(id);

    if (dto.dni && dto.dni !== paciente.dni) {
      const existente = await this.repository.findOneBy({
        dni: dto.dni,
      });

      if (existente) {
        throw new ConflictException('El DNI ya está registrado');
      }
    }

    Object.assign(paciente, dto);
    return this.repository.save(paciente);
  }

  async eliminar(id: number) {
    const paciente = await this.obtener(id);
    await this.repository.remove(paciente);

    return { mensaje: 'Paciente eliminado correctamente' };
  }
}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PacientesModule } from './pacientes/pacientes.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './pacientes/entities/paciente.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DB_PATH || 'DB.sqlite',
      entities: [Paciente],
      synchronize: true,
    }),
    PacientesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

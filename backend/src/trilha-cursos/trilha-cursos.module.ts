import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TrilhaCursosService } from './trilha-cursos.service';
import { TrilhaCursosController } from './trilha-cursos.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TrilhaCursosController],
  providers: [TrilhaCursosService],
})
export class TrilhaCursosModule {}
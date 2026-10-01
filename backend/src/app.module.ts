import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AssinaturasModule } from './assinaturas/assinaturas.module';
import { AulasModule } from './aulas/aulas.module';
import { AvaliacoesModule } from './avaliacoes/avaliacoes.module';
import { CategoriasModule } from './categorias/categorias.module';
import { CertificadosModule } from './certificados/certificados.module';
import { CursosModule } from './cursos/cursos.module';
import { MatriculasModule } from './matriculas/matriculas.module';
import { ModulosModule } from './modulos/modulos.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { PlanosModule } from './planos/planos.module';
import { ProgressoAulasModule } from './progresso-aulas/progresso-aulas.module';
import { TrilhasModule } from './trilhas/trilhas.module';
import { TrilhaCursosModule } from './trilha-cursos/trilha-cursos.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, AssinaturasModule, AulasModule, AvaliacoesModule, CategoriasModule, CertificadosModule, CursosModule, MatriculasModule, ModulosModule, PagamentosModule, PlanosModule, ProgressoAulasModule, TrilhasModule, TrilhaCursosModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProgressoAulasService } from './progresso-aulas.service';
import { CreateProgressoAulaDto } from './dto/create-progresso-aula.dto';
import { UpdateProgressoAulaDto } from './dto/update-progresso-aula.dto';

@ApiTags('progressoAulas')
@Controller('progressoAulas')
export class ProgressoAulasController {
  constructor(private readonly progressoAulasService: ProgressoAulasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um progresso de aula' })
  create(@Body() createProgressoAulaDto: CreateProgressoAulaDto) {
    return this.progressoAulasService.create(createProgressoAulaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar progressos de aula' })
  findAll() {
    return this.progressoAulasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar progresso de aula por ID' })
  findOne(@Param('id') id: string) {
    return this.progressoAulasService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar progresso de aula' })
  update(@Param('id') id: string, @Body() updateProgressoAulaDto: UpdateProgressoAulaDto) {
    return this.progressoAulasService.update(+id, updateProgressoAulaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover progresso de aula' })
  remove(@Param('id') id: string) {
    return this.progressoAulasService.remove(+id);
  }
}
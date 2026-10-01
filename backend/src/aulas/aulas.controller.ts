import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AulasService } from './aulas.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';

@ApiTags('aulas')
@ApiBearerAuth('token')
@Controller('aulas')
export class AulasController {
  constructor(private readonly aulasService: AulasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma aula' })
  create(@Body() createAulaDto: CreateAulaDto) {
    return this.aulasService.create(createAulaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar aulas' })
  findAll() {
    return this.aulasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar aula por ID' })
  findOne(@Param('id') id: string) {
    return this.aulasService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar aula' })
  update(@Param('id') id: string, @Body() updateAulaDto: UpdateAulaDto) {
    return this.aulasService.update(+id, updateAulaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover aula' })
  remove(@Param('id') id: string) {
    return this.aulasService.remove(+id);
  }
}
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TrilhaCursosService } from './trilha-cursos.service';
import { CreateTrilhaCursoDto } from './dto/create-trilha-curso.dto';
import { UpdateTrilhaCursoDto } from './dto/update-trilha-curso.dto';

@ApiTags('trilhaCursos')
@Controller('trilhaCursos')
export class TrilhaCursosController {
  constructor(private readonly trilhaCursosService: TrilhaCursosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um vinculo trilha-curso' })
  create(@Body() createTrilhaCursoDto: CreateTrilhaCursoDto) {
    return this.trilhaCursosService.create(createTrilhaCursoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar vinculos trilha-curso' })
  findAll() {
    return this.trilhaCursosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar vinculo trilha-curso por ID' })
  findOne(@Param('id') id: string) {
    return this.trilhaCursosService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar vinculo trilha-curso' })
  update(@Param('id') id: string, @Body() updateTrilhaCursoDto: UpdateTrilhaCursoDto) {
    return this.trilhaCursosService.update(+id, updateTrilhaCursoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover vinculo trilha-curso' })
  remove(@Param('id') id: string) {
    return this.trilhaCursosService.remove(+id);
  }
}
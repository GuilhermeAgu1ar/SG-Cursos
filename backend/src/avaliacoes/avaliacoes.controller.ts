import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AvaliacoesService } from './avaliacoes.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@ApiTags('avaliacoes')
@ApiBearerAuth('token')
@Controller('avaliacoes')
export class AvaliacoesController {
  constructor(private readonly avaliacoesService: AvaliacoesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma avaliacao' })
  create(@Body() createAvaliacaoDto: CreateAvaliacaoDto) {
    return this.avaliacoesService.create(createAvaliacaoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar avaliacoes' })
  findAll() {
    return this.avaliacoesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar avaliacao por ID' })
  findOne(@Param('id') id: string) {
    return this.avaliacoesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar avaliacao' })
  update(@Param('id') id: string, @Body() updateAvaliacaoDto: UpdateAvaliacaoDto) {
    return this.avaliacoesService.update(+id, updateAvaliacaoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover avaliacao' })
  remove(@Param('id') id: string) {
    return this.avaliacoesService.remove(+id);
  }
}
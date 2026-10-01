import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TrilhasService } from './trilhas.service';
import { CreateTrilhaDto } from './dto/create-trilha.dto';
import { UpdateTrilhaDto } from './dto/update-trilha.dto';

@ApiTags('trilhas')
@ApiBearerAuth('token')
@Controller('trilhas')
export class TrilhasController {
  constructor(private readonly trilhasService: TrilhasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma trilha' })
  create(@Body() createTrilhaDto: CreateTrilhaDto) {
    return this.trilhasService.create(createTrilhaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar trilhas' })
  findAll() {
    return this.trilhasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar trilha por ID' })
  findOne(@Param('id') id: string) {
    return this.trilhasService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar trilha' })
  update(@Param('id') id: string, @Body() updateTrilhaDto: UpdateTrilhaDto) {
    return this.trilhasService.update(+id, updateTrilhaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover trilha' })
  remove(@Param('id') id: string) {
    return this.trilhasService.remove(+id);
  }
}
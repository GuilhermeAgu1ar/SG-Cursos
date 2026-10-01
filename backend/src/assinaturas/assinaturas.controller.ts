import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssinaturasService } from './assinaturas.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';

@ApiTags('assinaturas')
@ApiBearerAuth('token')
@Controller('assinaturas')
export class AssinaturasController {
  constructor(private readonly assinaturasService: AssinaturasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma assinatura' })
  create(@Body() createAssinaturaDto: CreateAssinaturaDto) {
    return this.assinaturasService.create(createAssinaturaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar assinaturas' })
  findAll() {
    return this.assinaturasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar assinatura por ID' })
  findOne(@Param('id') id: string) {
    return this.assinaturasService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar assinatura' })
  update(@Param('id') id: string, @Body() updateAssinaturaDto: UpdateAssinaturaDto) {
    return this.assinaturasService.update(+id, updateAssinaturaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover assinatura' })
  remove(@Param('id') id: string) {
    return this.assinaturasService.remove(+id);
  }
}
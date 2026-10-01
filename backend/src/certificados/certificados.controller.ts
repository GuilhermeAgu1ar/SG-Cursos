import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CertificadosService } from './certificados.service';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';

@ApiTags('certificados')
@ApiBearerAuth('token')
@Controller('certificados')
export class CertificadosController {
  constructor(private readonly certificadosService: CertificadosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um certificado' })
  create(@Body() createCertificadoDto: CreateCertificadoDto) {
    return this.certificadosService.create(createCertificadoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar certificados' })
  findAll() {
    return this.certificadosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar certificado por ID' })
  findOne(@Param('id') id: string) {
    return this.certificadosService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar certificado' })
  update(@Param('id') id: string, @Body() updateCertificadoDto: UpdateCertificadoDto) {
    return this.certificadosService.update(+id, updateCertificadoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover certificado' })
  remove(@Param('id') id: string) {
    return this.certificadosService.remove(+id);
  }
}
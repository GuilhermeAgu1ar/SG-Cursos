import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCertificadoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  idUsuario: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  idCurso: number;

  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @IsOptional()
  idTrilha?: number;

  @ApiProperty({ example: 'CERT-AB12CD' })
  @IsString()
  @IsNotEmpty()
  codigoVerificacao: string;

  @ApiProperty({ example: '2026-06-10', required: false })
  @IsString()
  @IsOptional()
  dataEmissao?: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAvaliacaoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  idUsuario: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  idCurso: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  nota: number;

  @ApiProperty({ example: 'Curso excelente!', required: false })
  @IsString()
  @IsOptional()
  comentario?: string;

  @ApiProperty({ example: '2026-06-10', required: false })
  @IsString()
  @IsOptional()
  dataAvaliacao?: string;
}
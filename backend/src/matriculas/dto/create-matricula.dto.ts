import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMatriculaDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  idUsuario: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  idCurso: number;

  @ApiProperty({ example: '2026-06-05', required: false })
  @IsString()
  @IsOptional()
  dataMatricula?: string;

  @ApiProperty({ example: '2026-07-05', required: false })
  @IsString()
  @IsOptional()
  dataConclusao?: string;
}
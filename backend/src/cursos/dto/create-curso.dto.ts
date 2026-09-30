import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCursoDto {
  @ApiProperty({ example: 'Introducao ao NestJS' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 'Aprenda NestJS do zero' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  idInstrutor: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  idCategoria: number;

  @ApiProperty({ example: 'Intermediario' })
  @IsString()
  @IsNotEmpty()
  nivel: string;

  @ApiProperty({ example: '2026-06-05', required: false })
  @IsString()
  @IsOptional()
  dataPublicacao?: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  totalAulas: number;

  @ApiProperty({ example: 20 })
  @IsInt()
  totalHoras: number;
}
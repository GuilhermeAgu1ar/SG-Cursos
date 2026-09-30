import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAssinaturaDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  idUsuario: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  idPlano: number;

  @ApiProperty({ example: '2026-06-05', required: false })
  @IsString()
  @IsOptional()
  dataInicio?: string;

  @ApiProperty({ example: '2026-07-05', required: false })
  @IsString()
  @IsOptional()
  dataFim?: string;
}
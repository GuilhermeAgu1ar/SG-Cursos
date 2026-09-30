import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProgressoAulaDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  idUsuario: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  idAula: number;

  @ApiProperty({ example: '2026-06-10' })
  @IsString()
  @IsNotEmpty()
  dataConclusao: string;

  @ApiProperty({ example: 'concluida' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
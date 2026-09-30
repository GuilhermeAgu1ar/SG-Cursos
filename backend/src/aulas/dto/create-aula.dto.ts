import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAulaDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  idModulo: number;

  @ApiProperty({ example: 'Instalando o Node.js' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 'video' })
  @IsString()
  @IsNotEmpty()
  tipoConteudo: string;

  @ApiProperty({ example: 'https://example.com/video.mp4' })
  @IsString()
  @IsNotEmpty()
  urlConteudo: string;

  @ApiProperty({ example: 15 })
  @IsInt()
  duracaoMinutos: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  ordem: number;
}
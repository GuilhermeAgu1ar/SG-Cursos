import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Programacao' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'Categoria focada em programacao' })
  @IsString()
  @IsNotEmpty()
  descricao: string;
}
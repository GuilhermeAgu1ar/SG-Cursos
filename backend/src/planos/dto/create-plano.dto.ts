import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlanoDto {
  @ApiProperty({ example: 'Plano Mensal' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'Acesso a todos os cursos' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: 49.9 })
  @IsNumber()
  preco: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  duracaoMeses: number;
}
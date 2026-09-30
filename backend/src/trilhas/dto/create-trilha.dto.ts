import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTrilhaDto {
  @ApiProperty({ example: 'Trilha Full Stack' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 'Do zero ao deploy' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  idCategoria: number;
}
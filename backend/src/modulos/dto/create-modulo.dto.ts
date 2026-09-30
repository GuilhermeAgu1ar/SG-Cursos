import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateModuloDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  idCurso: number;

  @ApiProperty({ example: 'O comeco de tudo' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  ordem: number;
}
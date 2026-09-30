import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateTrilhaCursoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  idTrilha: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  idCurso: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  ordem: number;
}
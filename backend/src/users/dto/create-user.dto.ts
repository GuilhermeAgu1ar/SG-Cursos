import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome completo' })
  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;

  @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha com no mínimo 6 caracteres', minLength: 6 })
  @IsString()
  @MinLength(6)
  senhaHash: string;

  @ApiProperty({ example: '2026-06-05', description: 'Data de cadastro', required: false })
  @IsString()
  @IsOptional()
  dataCadastro?: string;
}
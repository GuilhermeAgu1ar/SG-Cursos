import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePagamentoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  idAssinatura: number;

  @ApiProperty({ example: 49.9 })
  @IsNumber()
  valorPago: number;

  @ApiProperty({ example: '2026-06-05', required: false })
  @IsString()
  @IsOptional()
  dataPagamento?: string;

  @ApiProperty({ example: 'cartao_credito' })
  @IsString()
  @IsNotEmpty()
  metodoPagamento: string;

  @ApiProperty({ example: 'txn_123456' })
  @IsString()
  @IsNotEmpty()
  idTransacaoGateway: string;
}
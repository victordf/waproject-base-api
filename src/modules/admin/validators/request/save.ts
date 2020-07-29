import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min, IsDecimal } from 'class-validator';
import { IRequest } from 'modules/database/interfaces/request';

export class SaveValidator implements IRequest {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: 'string' })
  public description: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: true, type: 'integer' })
  public amount: number;

  @IsNotEmpty()
  @IsDecimal()
  @Min(0)
  @ApiProperty({ required: true, type: 'decimal' })
  public value: number;
}

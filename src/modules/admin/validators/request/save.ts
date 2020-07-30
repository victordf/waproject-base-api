import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
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
  @IsNumber()
  @Min(0)
  @ApiProperty({ required: true, type: 'number' })
  public value: number;
}

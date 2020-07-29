import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IRequest } from '../interfaces/request';

export class Request extends Model implements IRequest {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'string' })
  public description: string;
  @ApiProperty({ type: 'decimal' })
  public amount: number;
  @ApiProperty({ type: 'decimal' })
  public value: number;

  @ApiProperty({ type: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'date-time' })
  public updatedDate: Date;

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }
}

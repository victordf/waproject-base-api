import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IRequest } from './../../database/interfaces/request';
import { Request } from 'modules/database/models/request';
import { Page, Transaction } from 'objection';

@Injectable()
export class RequestRepository {
  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Request>> {
    let query = Request.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.orderBy) {
      query = query.orderBy(params.orderBy, params.orderDirection);
    }

    if (params.term) {
      query = query.where(query => {
        return query.where('description', 'ilike', `%${params.term}%`);
      });
    }

    return query;
  }

  public async count(transaction?: Transaction): Promise<Number> {
    const result: any = await Request.query(transaction)
      .count('id as count')
      .first();

    return Number(result.count);
  }

  public async findBy(id: number, transaction?: Transaction): Promise<Request> {
    return Request.query(transaction)
      .where({ id })
      .first();
  }

  public async insert(model: IRequest, transaction?: Transaction): Promise<Request> {
    return Request.query(transaction).insert(model);
  }

  public async update(model: IRequest, transaction?: Transaction): Promise<Request> {
    return Request.query(transaction).updateAndFetchById(model.id, <Request>model);
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await Request.query(transaction)
      .del()
      .where({ id });
  }
}

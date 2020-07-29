import { IRequest } from './../../interfaces/request';
import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const newRequest: IRequest = {
    description: 'Pão de Queijo',
    amount: 20,
    value: 0.1,
    createdDate: new Date(),
    updatedDate: new Date()
  };

  const requests = await knex
    .count()
    .from('Request')
    .first();

  if (Number(requests.count) > 0) return;
  await knex.insert(newRequest).into('Request');
}

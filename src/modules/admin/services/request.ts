import { IRequest } from './../../database/interfaces/request';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'modules/database/models/request';

import { RequestRepository } from '../repositories/request';

@Injectable()
export class RequestService {
  constructor(private requestRepository: RequestRepository) {}

  public async save(model: IRequest): Promise<Request> {
    if (!model.description) {
      throw new BadRequestException('invalid-description');
    }

    if (!model.amount) {
      throw new BadRequestException('invalid-amount');
    }

    if (!model.value) {
      throw new BadRequestException('invalid-value');
    }

    if (model.id) return this.update(model);
    return this.create(model);
  }

  public async remove(requestId: number): Promise<void> {
    const request = await this.requestRepository.findBy(requestId);

    if (!request) throw new NotFoundException('not-found');

    return this.requestRepository.remove(requestId);
  }

  private async create(model: IRequest): Promise<Request> {
    const request = await this.requestRepository.insert(model);

    return request;
  }

  private async update(model: IRequest): Promise<Request> {
    const request = await this.requestRepository.findBy(model.id);

    if (!request) throw new NotFoundException('not-found');

    return this.requestRepository.update({ ...request, ...model });
  }
}

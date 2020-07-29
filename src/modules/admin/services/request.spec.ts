import { BadRequestException, NotFoundException } from '@nestjs/common';

import { IRequest } from 'modules/database/interfaces/request';
import { RequestRepository } from '../repositories/request';
import { RequestService } from './request';

describe('Admin/RequestService', () => {
  let requestRepository: RequestRepository;
  let service: RequestService;

  const request: IRequest = {
    description: 'description',
    amount: 10,
    value: 2.5
  };

  beforeEach(async () => {
    requestRepository = new RequestRepository();
    service = new RequestService(requestRepository);
  });

  it('should create a request', async () => {
    jest.spyOn(requestRepository, 'insert').mockImplementationOnce(request => Promise.resolve({ ...request } as any));

    const result = await service.save(request);

    expect(result).not.toBeFalsy();
    expect(result).toEqual(request);
  });

  it('should update a request', async () => {
    jest.spyOn(requestRepository, 'findBy').mockResolvedValueOnce({ ...request } as any);
    jest.spyOn(requestRepository, 'update').mockImplementationOnce(request => Promise.resolve({ ...request } as any));

    const result = await service.save({ id: 1, ...request });

    expect(result).not.toBeFalsy();
    expect(result).toEqual({ id: 1, ...request });
  });

  it('should remove a request', async () => {
    jest.spyOn(requestRepository, 'findBy').mockResolvedValueOnce({ ...request } as any);
    jest.spyOn(requestRepository, 'remove').mockResolvedValueOnce({ id: 2 } as any);

    await service.remove(1);
  });

  it('should throw NotFoundException when try update a not found request', async () => {
    jest.spyOn(requestRepository, 'findBy').mockResolvedValueOnce(null);

    try {
      await service.save({ id: 1, ...request });
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw BadRequestException with message invalid-description when save with a invalid field', async () => {
    try {
      await service.save({ id: 1, ...request, description: null });
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message.message).toBe('invalid-description');
    }
  });

  it('should throw BadRequestException with message invalid-amount when save with a invalid field', async () => {
    try {
      await service.save({ id: 1, ...request, amount: null });
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message.message).toBe('invalid-amount');
    }
  });

  it('should throw BadRequestException with message invalid-value when save with a invalid field', async () => {
    try {
      await service.save({ id: 1, ...request, value: null });
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message.message).toBe('invalid-value');
    }
  });

  it('should throw NotFoundException when try remove a not found request', async () => {
    jest.spyOn(requestRepository, 'findBy').mockResolvedValueOnce(null);

    try {
      await service.remove(1);
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
});

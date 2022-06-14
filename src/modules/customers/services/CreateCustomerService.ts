//Criação de clientes

import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

//está tipando as informações que está recebendo
interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    //envio de dados
    const customer = customersRepository.create({
      name,
      email,
    });
    await customersRepository.save(customer); // salvando dados

    return customer;
  }
}
export default CreateCustomerService;

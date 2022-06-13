//Criação de produtos

import AppError from '@shared/errors/appError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

//está tipando as informações que está recebendo
interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }
    //criando critografia de senha no json
    const hashedPassword = await hash(password, 8);

    //envio de dados
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await userRepository.save(user); // salvando dados

    return user;
  }
}
export default CreateUserService;

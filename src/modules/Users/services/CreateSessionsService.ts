import AppError from '@shared/errors/appError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

//está tipando as informações que está recebendo
interface IRequeste {
  email: string;
  password: string;
}
//a melhor forma de representar dados compostos. Criando interfaces
interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequeste): Promise<IResponse> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combinnation.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combinnation.', 401);
    }
    // entrar no md5 generator para gerar um has token e colocar como parametro
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    //forma de retorna mais de uma coisa, passando um objeto
    return {
      user,
      token,
    };
  }
}
export default CreateSessionsService;

import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UsersTokensRepository from '../typeorm/repositories/UsersTokensRepository';

//está tipando as informações que está recebendo
interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepositoty = getCustomRepository(UsersTokensRepository);

    const userToken = await userTokenRepositoty.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }
    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }
    // como saber se usar o await, se usa quando o metodo for async ou retorna uma promesa
    user.password = await hash(password, 8);

    await userRepository.save(user); // salvando
  }
}
export default ResetPasswordService;

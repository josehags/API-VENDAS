import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UsersTokensRepository from '../typeorm/repositories/UsersTokensRepository';
import EherealMail from '@config/mail/EtherealMail';

//está tipando as informações que está recebendo
interface IRequest {
  email: string;
}

class SendForgotPassWordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepositoty = getCustomRepository(UsersTokensRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const token = await userTokenRepositoty.generate(user.id);

    //console.log(token);
    await EherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida: ${token}`,
    });
  }
}
export default SendForgotPassWordEmailService;

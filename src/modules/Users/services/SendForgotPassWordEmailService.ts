import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import path, { dirname } from 'path';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UsersTokensRepository from '../typeorm/repositories/UsersTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

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

    const { token } = await userTokenRepositoty.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );
    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API vendas] Recuperção de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          // antes de colocar o .env o comando seria assim link: `http//localhost:300/resert_password?token=${token}`,
          link: `${process.env.APP_WEB_URL}/resert_password?token=${token}`,
        },
      },
    });
  }
}
export default SendForgotPassWordEmailService;

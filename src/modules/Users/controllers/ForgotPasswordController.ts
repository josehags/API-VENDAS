import { Request, Response } from 'express';
import SendForgotPassWordEmailService from '../services/SendForgotPassWordEmailService';

//criando nova senha para o usúario.
export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPassWordEmailService();

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}

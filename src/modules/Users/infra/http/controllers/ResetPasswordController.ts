import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '../../../services/ResetPasswordService';

//criando nova senha para o usúario.
export default class ResetPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { password, token } = request.body;

        const resetPassword = container.resolve(ResetPasswordService);

        await resetPassword.execute({
            password,
            token,
        });

        return response.status(204).json();
    }
}

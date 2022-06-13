import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      user_id: request.user.id,
      //file sem o ? A crítica é por conta desse objeto file da request poder ter valor string ou undefined. Você contornar isso forçando para que o valor seja sempre uma string
      avatarFileName: request.file?.filename as string,
    });

    return response.json(user);
  }
}

import AppError from '@shared/errors/appError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';

//está tipando as informações que está recebendo
interface IRequest {
    user_id: string;
    avatarFileName: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);

        const strorageProvider = new DiskStorageProvider();

        const user = await userRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }
        if (user.avatar) {
            await strorageProvider.deleteFile(user.avatar);
        }

        const filename = await strorageProvider.saveFile(avatarFileName);

        user.avatar = filename;

        await userRepository.save(user);

        return user;
    }
}
export default UpdateUserAvatarService;

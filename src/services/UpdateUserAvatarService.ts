import { getRepository } from "typeorm";
import uploadConfig from "../config/upload";
import User from "../models/User";
import { join } from 'path';
import AppError from '../errors/AppError';
const fs = require('fs');


interface Request {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user)
      throw new AppError('Only authenticated users can change their avatars', 401);

    if (user.avatar) {
      const userAvatarFilePath = join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists)
       await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;

  }
}

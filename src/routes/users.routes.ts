import { Router } from "express";
import CreateUserService from "../services/CreateUserService";
import { hash } from "bcryptjs";
import ensureAuthentication from "../middlewares/ensureAuthenticated";
import multer = require("multer");
import uploadConfig from "../config/upload";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const hashedPassword = await hash(password, 8);

    const user = await createUser.execute({
      name, email,
      password: hashedPassword,
    });
    user.password = '';
    return response.json(user);

  } catch (err) {
    return response.status(400).json({ error: err });
  }
});

const upload = multer({ storage: uploadConfig.Storage });


usersRouter.patch('/avatar', ensureAuthentication, upload.single('avatar'), async (request, response) => {
  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({
    user_id: request.user.id,
    avatarFilename: request.file.filename,
  });

  user.password = '';
  return response.json(user);
})

export default usersRouter;

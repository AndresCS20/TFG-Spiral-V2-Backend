import { Request, Response } from "express";
import { registerNewUser, loginUser, checkPasswordSvc } from "./../services/auth.services";

const authRegister = async ({ body }: Request, res: Response) => {
  const responseUser = await registerNewUser(body);
  res.send(responseUser);
};

const authLogin = async ({ body }: Request, res: Response) => {
  const { username, password } = body;
  const responseUser = await loginUser({ username, password });
  
  switch (responseUser) {
    case "NOT_FOUND_USER":
      res.status(404);
      res.send({ message: responseUser });
      break;
    case "PASSWORD_INCORRECT":
      res.status(403);
      res.send({ message: responseUser });
      break;
    default:
      const { user } = responseUser;
      res.status(200).send({
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        accessToken: responseUser.token,
        profile_picture: user.profile_picture,
        banner_picture: user.banner_picture
      });
  }
};

const checkPassword = async ({ body }: Request, res: Response) => {

  const { username, password } = body;
  const responseUser = await checkPasswordSvc({ username, password });
  switch (responseUser) {
    case "NOT_FOUND_USER":
      return  res.status(404).json({
        status: 'error',
        message: responseUser,
      })
    case "PASSWORD_INCORRECT":
      return  res.status(403).json({
        status: 'error',
        message: responseUser,
      })
    default:
      return  res.status(200).json({
        status: 'success',
        message: 'Contraeña correcta',
      });
    }
};
 

export { authLogin, authRegister, checkPassword };

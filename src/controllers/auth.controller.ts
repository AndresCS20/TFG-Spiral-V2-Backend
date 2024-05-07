import { Request, Response } from "express";
import { registerNewUser, loginUser } from "./../services/auth.services";

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
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        accessToken: responseUser.token,
        profile_picture: user.profile_picture,
        banner_picture: user.banner_picture
      });
  }
};

 

export { authLogin, authRegister };

import { Auth } from "./../interfaces/auth.interface";
import { User } from "./../interfaces/user.interface";
import UserModel from "./../models/user.model";
import { encrypt, verified } from "./../utils/bcrypt.handle";
import { generateToken } from "./../utils/jwt.handle";

const registerNewUser = async ({ email, password, username }: User) => {
  const checkIs = await UserModel.findOne({ username });
  if (checkIs) return "ALREADY_USER";
  const passHash = await encrypt(password); //TODO 12345678
  const registerNewUser = await UserModel.create({
    email,
    password: passHash,
    username,
  });
  //TODO 123456
  return registerNewUser;
};
//TODO Cambiar la busqueda por email a username
const loginUser = async ({ username, password }: Auth) => {
  const checkIs = await UserModel.findOne({ username });
  if (!checkIs) return "NOT_FOUND_USER";

  const passwordHash = checkIs.password; //TODO el encriptado!
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect) return "PASSWORD_INCORRECT";

  const token = generateToken(checkIs.username);
  const data = {
    token,
    user: checkIs,
  };
  return data;
};

export { registerNewUser, loginUser };
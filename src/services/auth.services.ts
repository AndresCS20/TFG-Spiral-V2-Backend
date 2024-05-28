import { Auth } from "./../interfaces/auth.interface";
import { User } from "./../interfaces/user.interface";
import UserModel from "./../models/user.model";
import { encrypt, verified } from "./../utils/bcrypt.handle";
import { generateToken } from "./../utils/jwt.handle";

const registerNewUser = async ({ email, password, username, fullname,birth_date }: User) => {
  const checkIs = await UserModel.findOne({ username });
  const profile_picture = `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${username}&radius=50&backgroundColor=059ff2,71cf62,d84be5,d9915b,f6d594,fcbc34,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear` 
  const banner_picture = `https://picsum.photos/seed/${username}/1280/720`
  if (checkIs) return "ALREADY_USER";
  const passHash = await encrypt(password); 
  const registerNewUser = await UserModel.create({
    email,
    password: passHash,
    username,
    fullname,
    profile_picture,
    banner_picture,
    birth_date
  });
  return registerNewUser;
};

const loginUser = async ({ username, password }: Auth) => {
  const checkIs = await UserModel.findOne({ username });
  if (!checkIs) return "NOT_FOUND_USER";

  const passwordHash = checkIs.password; 
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect) return "PASSWORD_INCORRECT";

  const token = generateToken(checkIs.username);
  const data = {
    token,
    user: checkIs,
  };
  return data;
};

const checkPasswordSvc = async ({username,password}: Auth) => {

  const checkIs = await UserModel.findOne({ username });
  if (!checkIs) return "NOT_FOUND_USER";

  const passwordHash = checkIs.password; 
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect) return "PASSWORD_INCORRECT";

  return passwordHash;
}


export { registerNewUser, loginUser, checkPasswordSvc };
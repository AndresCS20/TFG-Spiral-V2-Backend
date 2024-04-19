import UserModel from "@models/user.model";
import { User } from "@interfaces/user.interface";


const insertUserSvc = async (user: User) => {
    const responseInsert = await UserModel.create(user);
    return responseInsert;
  };
  
  const getUsersSvc = async () => {
    const responseItem = await UserModel.find({});
    return responseItem;
  };
  
  const getUserSvc = async (username: string) => {
    const responseItem = await UserModel.findOne({ username: username });
    return responseItem;
  };
  
  const updateUserSvc = async (id: string, data: User) => {
    
    //TODO: Comprobar si tiene el campo contraseña, modificarlo del objeto que recibe por segundo parametro y hashearlo

    const responseItem = await UserModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return responseItem;
  };
  
  const deleteUserSvc = async (id: string) => {
    const responseItem = await UserModel.deleteOne({ _id: id });
    return responseItem;
  };
  
  export { insertUserSvc, getUsersSvc, getUserSvc, updateUserSvc, deleteUserSvc };
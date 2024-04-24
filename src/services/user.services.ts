import UserModel from "@models/user.model";
import { User } from "@interfaces/user.interface";
import { encrypt } from "./../utils/bcrypt.handle";

import mongoose from "mongoose";


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
  
  const updateUserSvc = async (username: string, data: User) => {
        
    if (data.password) {
      const encryptedPassword = await encrypt(data.password);
      data.password = encryptedPassword;
  }

    const responseItem = await UserModel.updateOne(
      { username: username },
      data,

    );
    

    return responseItem;
  };
  
  const deleteUserSvc = async (username: string) => {
    const responseItem = await UserModel.deleteOne({ username: username });
    return responseItem;
  };

  const joinCommunityUserSvc = async (userId: string, communityId: string) => {
  
    const communityIdObj = new mongoose.Types.ObjectId(communityId).toString();
    const responseItem = await UserModel.updateOne(
        { _id: userId },
        { $push: { communities: {community: communityIdObj, date: Date.now()}}},
        { new: true });

      console.log("responseuser",responseItem)
      
      return responseItem;

    }

    const leaveCommunityUserSvc = async (userId: string, communityId: string) => {
      const communityIdObj = new mongoose.Types.ObjectId(communityId).toString();
      const responseItem = await UserModel.updateOne(
        { _id: userId },
        { $pull: { communities: { community: communityIdObj } } },
        { new: true }
      );

      console.log("responseuserEliminar", responseItem);

      return responseItem;
    };
  
  export { insertUserSvc, getUsersSvc, getUserSvc, updateUserSvc, deleteUserSvc, joinCommunityUserSvc, leaveCommunityUserSvc };
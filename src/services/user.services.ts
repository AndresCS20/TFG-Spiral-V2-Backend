import UserModel from "@models/user.model";
import { Follow, User } from "@interfaces/user.interface";
import { encrypt } from "./../utils/bcrypt.handle";

import mongoose from "mongoose";
import { Types } from "mongoose";


// Obtener todos los usuarios
const getAllUsersSvc = async () => {
  try {
    const allPublications = await UserModel.find().populate("communities", "shortname fullname profile_picture").populate("following", "username fullname profile_picture").populate("followers", "username fullname profile_picture");
    return allPublications;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener todos los usuarios: " + error);
  }
};

// Obtener un usuario por username
const getOneUserSvc = async (username: string) => {
  try {
    const publication = await UserModel.findOne({username: username}).populate("communities", "shortname fullname profile_picture").populate("following", "username fullname profile_picture").populate("followers", "username fullname profile_picture");
    return publication;
  } catch (error) {
    throw new Error("Error al obtener el usuario: " + error);
  }
};

// Crear un nuevo usuario
const createUserSvc = async (user: User) => {
  try {
    const newPublication = await UserModel.create(user);
    return newPublication;
  } catch (error) {
    throw new Error("Error al crear la publicación");
  }
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
    try {
      const responseItem = await UserModel.deleteOne({ username });
      if (responseItem.deletedCount === 0) {
        throw new Error('User not found or could not be deleted');
      }
  
      return responseItem;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const joinCommunityUserSvc = async (userId: string, communityId: string) => {
  
try {
      const communityIdObj = new mongoose.Types.ObjectId(communityId).toString();
      const responseItem = await UserModel.updateOne(
          { _id: userId },
          { $push: { communities: {community: communityIdObj, date: Date.now()}}},
          { new: true });
  
        console.log("responseuser",responseItem)
        
        return responseItem;
    }catch (error) {
          console.error(error);
          throw error;
        }
    }

    const leaveCommunityUserSvc = async (userId: string, communityId: string) => {
    try {
        const communityIdObj = new mongoose.Types.ObjectId(communityId).toString();
        const responseItem = await UserModel.updateOne(
          { _id: userId },
          { $pull: { communities: { community: communityIdObj } } },
          { new: true }
        );
  
        console.log("responseuserEliminar", responseItem);
  
        return responseItem;
    } catch (error) {
        console.error(error);
        throw error;
    }
    };

    const getFollowersOfUserSvc = async (username: string) => {
      try {
        // Buscar el usuario por su ID y obtener el array de IDs de seguidores
        // const user = await UserModel.findById(user);
        const userFollowers = await UserModel.find({ username: username}, 'followers -_id').populate("followers.user", "username fullname profile_picture");
        if (!userFollowers) {
          throw new Error("Usuario no encontrado");
        }
    

        return userFollowers;


      } catch (error) {
        throw new Error(`Error al obtener seguidores del usuario: ${error}`);
      }
    };

    const getFollowingOfUserSvc = async (username: string) => {
      try {
        const userFollowing = await UserModel.findOne({ username: username}, 'following -_id').populate("following.user", "username fullname profile_picture");
        if (!userFollowing) {
          throw new Error("Usuario no encontrado");
        }
    
        // Devuelve directamente el array 'following'
        return userFollowing.following;
      } catch (error) {
        throw new Error(`Error al obtener seguidos del usuario: ${error}`);
      }
    };
  
  export { createUserSvc, getOneUserSvc, getAllUsersSvc, updateUserSvc, deleteUserSvc, joinCommunityUserSvc, leaveCommunityUserSvc, getFollowersOfUserSvc, getFollowingOfUserSvc };
import UserModel from "@models/user.model";
import { User } from "@interfaces/user.interface";


const isFollowingUserSvc = async (userId: string, followId: string): Promise<boolean> => {
  try {
    // Buscar al usuario seguidor
    const user = await UserModel.findById(userId);

    // Verificar si el usuario seguido ya está en la lista de following del usuario seguidor
    const isFollowing = user ? user.following.some(follow => follow.user.toString() === followId) : false;
    
    return isFollowing;
  } catch (error) {
    console.error(`Error al verificar el seguimiento: ${error}`);
    return false; // Devolver false cuando se produce una excepción
  }
};


const insertFollowSvc = async (userId: string, followId: string) => {
  try {
    console.log(`Insertando seguimiento de ${userId} a ${followId}`);

    // Primero, insertar en la lista de following del userId
    const responseInsert1 = await UserModel.updateOne(
      { _id: userId },
      { $push: { following: { user: followId, date: new Date() } } }
    );

    console.log(`Resultado de la primera inserción: ${JSON.stringify(responseInsert1)}`);

    // Luego, insertar en la lista de followers del followId
    const responseInsert2 = await UserModel.updateOne(
      { _id: followId },
      { $push: { followers: { user: userId, date: new Date() } } }
    );

    console.log(`Resultado de la segunda inserción: ${JSON.stringify(responseInsert2)}`);


    // Devolver el resultado de ambas inserciones
    return responseInsert1 && responseInsert2;
  } catch (error) {
    console.error(`Error al insertar el seguimiento: ${error}`);
    throw error;
  }
};


const deleteFollowSvc = async (userId: string, followId: string): Promise<boolean> => {
  try {
    // Eliminar followId de la lista de following del usuario
    const responseDelete = await UserModel.updateOne(
      { _id: userId },
      { $pull: { following: {user: followId}}}
    );

    // Eliminar userId de la lista de followers de followId
    const responseDelete2 = await UserModel.updateOne(
      { _id: followId },
      { $pull: { followers: {user: userId}}}
    );

    // Devolver true si ambas operaciones fueron exitosas
    return responseDelete.modifiedCount > 0 && responseDelete2.modifiedCount > 0;
  } catch (error) {
    console.error(`Error al eliminar el seguimiento: ${error}`);
    throw error;
  }
};

export { insertFollowSvc, deleteFollowSvc, isFollowingUserSvc};


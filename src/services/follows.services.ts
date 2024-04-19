import UserModel from "@models/user.model";
import { User } from "@interfaces/user.interface";

const insertFollowSvc = async (userId: string, followId: string) => {
  //Hay que insertar primero en la lista de following del userId  y luego en la lista de followers del followId

  const responseInsert = await UserModel.updateOne(
    { _id: userId },
    { $push: { following: {user: followId,date: new Date()}}}
  );

  const responseInsert2 = await UserModel.updateOne(
    { _id: followId },
    { $push: { followers: {user: userId,date: new Date()}}}
  );

  //Devolver el resultado de ambas inserciones
  return responseInsert && responseInsert2;


}



// const insertFollowSvc = async (userId: string, followId: string) => {
//   const responseInsert = await UserModel.updateOne(
//     { _id: userId },
//     { $push: { followers: {user: followId,date: new Date()}}}
//   );
//   return responseInsert;
// };

const deleteFollowSvc = async (userId: string, followId: string) => {

  const responseDelete = await UserModel.updateOne(
    { _id: userId },
    { $pull: { following: {user: followId}}}
  );

  const responseDelete2 = await UserModel.updateOne(
    { _id: followId },
    { $pull: { followers: {user: userId}}}
  );

  //Devolver el resultado de ambas inserciones
  return responseDelete && responseDelete2;

  // const responseItem = await UserModel.updateOne(
  //   { _id: followId },
  //   { $pull: { followers: { user: followId } } }
  // );
  // return responseItem;
};

export { insertFollowSvc, deleteFollowSvc};

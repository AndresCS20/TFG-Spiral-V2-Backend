import { Schema, Types, model, Model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
  {
    username: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    description: {
      type: String,
      default: "Soy la descripcion",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model("users", UserSchema);
export default UserModel;
// import { Schema, model } from 'mongoose';
// import { User } from  '@interfaces/user.interface'
// const UserSchema = new Schema<User>({
//     username:{
//         type: String,
//         required: true
//     },
//     fullname:{
//         type: String
//     },
//     email:{
//         type: String,
//         required: true
//     },
//     password:{
//         type: String,
//         required: true
//     },
//     ubication: {
//         type: String
//     },
//     profile_picture: {
//         type: String
//     },
//     banner_picture:{
//         type: String
//     },
//     link: {
//         type: String
//     },
//     roles: {
//         type:[String]
//     },
//     birth_date: {
//         type: Date
//     },
//     createdAt: {
//         type: Date
//     },
//     updatedAt: {
//         type: Date
//     }
// })

// const UserModel = model('User',UserSchema);
// export default UserModel;
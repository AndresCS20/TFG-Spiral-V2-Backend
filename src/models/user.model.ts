import { Schema, Types, model } from "mongoose";
import { User } from "@interfaces/user.interface";

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    ubication: {
      type: String,
    },
    profile_picture: {
      type: String,
    },
    profile_picture_frame:  {
      type: String,
    },
    banner_picture: {
      type: String,
    },
    link: {
      type: String,
    },
    birth_date: {
      type: Date,
    },
    interests: { 
      type: [String],
       default: [] 
    },
    social_networks: {
      type: [
        {
          name: {
            type: String,
          },
          url: {
            type: String,
          },
        },
      ],
      default : []
    },
    following: {
      type: [
        {
          user: {
            type: Types.ObjectId,
            ref: "users",
          },
          date: {
            type: Date, 
            default: Date.now
          },
        },
      ],
    },
    followers: {
      type: [
        {
          user: {
            type: Types.ObjectId,
            ref: "users",
          },
          date: {
            type: Date, 
            default: Date.now
          },
        },
      ],
    },
    communities: {
      type: [
        {
          community: {
            type: Types.ObjectId,
            ref: "communities",
          },
          date: {
            type: Date, 
            default: Date.now
          },
        },
      ],
    }
  },
  {
    versionKey: false, // Desactiva la inclusión de la propiedad "__v"
    timestamps: true, // Crea automáticamente las propiedades "createdAt" y "updatedAt"
  }
);

const UserModel = model("users", UserSchema);
export default UserModel;
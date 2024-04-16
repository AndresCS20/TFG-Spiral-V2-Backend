import mongoose from "mongoose";
import { Auth } from "./auth.interface";

export interface User extends Auth {
  _id: string;
  email: string;
  fullname: string;
  description: string;
  profile_picture: string;
  banner_picture: string;
  ubication: string;
  link: string;
  birth_date: Date;
  following: Follow[];
  followers: Follow[];
  communities: Community[];
  createdAt: Date;
  updatedAt: Date;
}

interface Follow {
  user: mongoose.Types.ObjectId;
  date: Date;
}

interface Community {
  community: mongoose.Types.ObjectId;
  date: Date;
}

  
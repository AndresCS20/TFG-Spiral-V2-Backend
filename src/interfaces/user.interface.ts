import mongoose from "mongoose";
import { Auth } from "./auth.interface";

export interface User extends Auth {
  _id: string;
  email: string;
  fullname: string;
  description: string;
  profile_picture: string;
  profile_picture_frame: string;
  banner_picture: string;
  ubication: string;
  link: string;
  birth_date: Date;
  interests: string[];
  social_networks: SocialNetwork[];
  following: Follow[];
  followers: Follow[];
  communities: Community[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialNetwork {
  name: string;
  link: string;
}

export interface Follow {
  user: mongoose.Types.ObjectId;
  date: Date;
}

export interface Community {
  community: mongoose.Types.ObjectId;
  date: Date;
}

  
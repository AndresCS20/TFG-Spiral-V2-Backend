import mongoose from "mongoose";

export interface Community{
    _id: string;
    shortname: string;
    fullname: string;
    description: string;
    profile_picture: string;
    banner_picture: string;
    owner: mongoose.Types.ObjectId;
    members: Member[];
    createdAt: Date;
    updatedAt: Date;
}

interface Member{
    user: string;
    //role: string;
    date: Date;
}
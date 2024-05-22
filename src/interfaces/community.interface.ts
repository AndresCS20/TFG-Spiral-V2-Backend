import mongoose from "mongoose";

export interface Community{
    _id: string;
    shortname: string;
    fullname: string;
    description: string;
    profile_picture: string;
    banner_picture: string;
    owner: mongoose.Types.ObjectId;
    rules: Rule[];
    buttons: Button[];
    members: Member[];
    createdAt: Date;
    updatedAt: Date;
}

interface Button{
    title: string;
    url: string;
    icon: string;
    color: string;
}

interface Rule{
    title: string;
    content: string;
}

interface Member{
    user: string;
    //role: string;
    date: Date;
}
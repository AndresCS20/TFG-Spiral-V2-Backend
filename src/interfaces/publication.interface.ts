import mongoose from "mongoose";

export interface Publication {
    _id: string;
    content: string;
    // file: string;
    author: mongoose.Types.ObjectId;
    community: mongoose.Types.ObjectId;
    reactions: Reaction[];
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}

interface Reaction{
    user: mongoose.Types.ObjectId;
    type: string;
    date: Date;
}

interface Comment{
    user: mongoose.Types.ObjectId;
    content: string;
    date: Date;
}
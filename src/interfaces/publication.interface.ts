import mongoose from "mongoose";

export const ReactionType = [
    "LIKE",
    "DISLIKE",
    "LOVE",
    "HAHA",
    "WOW",
    "SAD",
    "ANGRY"
]


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

export interface Reaction{
    user: mongoose.Types.ObjectId;
    type: String;
    date: Date;
}

export interface Comment{
    user: mongoose.Types.ObjectId;
    content: string;
    date: Date;
}
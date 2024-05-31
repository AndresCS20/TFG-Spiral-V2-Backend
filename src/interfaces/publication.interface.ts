import mongoose from "mongoose";

export const ReactionType = [
    "like",
    "love",
    "haha",
    "wow",
    "sad",
    "angry",
    "dislike",
    "thanks"
    


]

// { type: 'like', name: 'Me gusta', icon: '👍', reactions: [] },
// { type: 'love', name: 'Me encanta', icon: '❤️', reactions: [] },
// { type: 'haha', name: 'Me divierte', icon: '😂', reactions: [] },
// { type: 'wow', name: 'Me asombra', icon: '😯', reactions: [] },
// { type: 'sad', name: 'Me entristece', icon: '😢', reactions: [] },
// { type: 'angry', name: 'Me encabrona', icon: '😡', reactions: [] },
// { type: 'dislike', name: 'No me gusta', icon: '🤗', reactions: []},
// { type: 'thanks', name: 'Lo agradezco', icon: '🙏', reactions: []}

export interface Publication {
    _id: string;
    content: string;
    // file: string;
    author: mongoose.Types.ObjectId;
    community: mongoose.Types.ObjectId;
    reactions: Reaction[];
    comments: Comment[];
    images: string[];
    video: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Reaction {
    type: string;
    name: string;
    icon: string;
    reactions: UserReaction[];
  }

export interface UserReaction {
    user: mongoose.Types.ObjectId;
    date: Date;
  }

export interface Comment{
    user: mongoose.Types.ObjectId;
    content: string;
    date: Date;
}
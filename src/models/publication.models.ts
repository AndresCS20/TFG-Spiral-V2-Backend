import mongoose, { Schema, Types, model } from "mongoose";
import { Publication } from "../interfaces/publication.interface";

const ReactionSchema = new Schema({
  user: { type: Types.ObjectId, ref: "users" },
  type: { type: String },
  date: { type: Date, default: Date.now },
});

const CommentSchema = new Schema({
  user: { type: Types.ObjectId, ref: "users" },
  content: { type: String },
  date: { type: Date, default: Date.now },
});

const PublicationSchema = new Schema<Publication>(
  {
    content: { 
        type: String,
        required: true,
     },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "communities"
    },
    reactions: [ReactionSchema],
    comments: [CommentSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PublicationModel = model("publications", PublicationSchema);
export default PublicationModel;
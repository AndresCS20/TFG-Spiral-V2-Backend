import mongoose, { Schema, Types, model } from "mongoose";
import { Publication } from "../interfaces/publication.interface";

const ReactionSchema = new Schema({
  user: { type: Types.ObjectId, ref: "users", required: true},
  type: { type: String, required: true},
  date: { type: Date, default: Date.now },
});

const CommentSchema = new Schema({
  user: { type: Types.ObjectId, ref: "users", required: true},
  content: { type: String, required: true},
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
    images: [String],
    video: String
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PublicationModel = model("publications", PublicationSchema);
export default PublicationModel;
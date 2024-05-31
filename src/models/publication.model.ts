import mongoose, { Schema, Types, model } from "mongoose";
import { Publication } from "../interfaces/publication.interface";

// const ReactionSchema = new Schema({
//   user: { type: Types.ObjectId, ref: "users", required: true},
//   type: { type: String, required: true},
//   date: { type: Date, default: Date.now },
// });

const ReactionSchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  reactions: [{
    user: { type: Types.ObjectId, ref: "users" },
    date: { type: Date, default: Date.now },
  }],
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

PublicationSchema.pre('save', function(next) {
  if (this.isNew) {
    this.reactions = [
      { type: 'like', name: 'Me gusta', icon: '👍', reactions: [] },
      { type: 'love', name: 'Me encanta', icon: '❤️', reactions: [] },
      { type: 'haha', name: 'Me divierte', icon: '😂', reactions: [] },
      { type: 'wow', name: 'Me asombra', icon: '😯', reactions: [] },
      { type: 'sad', name: 'Me entristece', icon: '😢', reactions: [] },
      { type: 'angry', name: 'Me encabrona', icon: '😡', reactions: [] },
      { type: 'dislike', name: 'No me gusta', icon: '🤗', reactions: []},
      { type: 'thanks', name: 'Lo agradezco', icon: '🙏', reactions: []}
    ];
  }
  next();
});

const PublicationModel = model("publications", PublicationSchema);
export default PublicationModel;
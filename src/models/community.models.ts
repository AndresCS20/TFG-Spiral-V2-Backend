import mongoose, { Schema, model } from "mongoose";
import { Community } from "../interfaces/community.interface";

const MemberSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  date: { type: Date, default: Date.now },
});

const CommunitySchema: Schema = new Schema<Community>({
  short_name: { type: String, required: true },
  full_name: { type: String, required: true },
  description: { type: String },
  profile_picture: { type: String },
  banner_picture: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  members: [MemberSchema],
});

const CommunityModel = model("communities", CommunitySchema);
export default CommunityModel;

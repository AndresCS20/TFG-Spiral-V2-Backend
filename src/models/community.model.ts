import mongoose, { Schema, model } from "mongoose";
import { Community } from "../interfaces/community.interface";

const MemberSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  date: { type: Date, default: Date.now },
});

const RuleSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
})

const ButtonSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
})

const CommunitySchema: Schema = new Schema<Community>({
  shortname: { type: String, required: true },
  fullname: { type: String, required: true },
  description: { type: String },
  profile_picture: { type: String },
  banner_picture: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  members: [MemberSchema],
  rules: [RuleSchema],
  buttons: [ButtonSchema],
},
  {
  versionKey: false, // Desactiva la inclusión de la propiedad "__v"
  timestamps: true, // Crea automáticamente las propiedades "createdAt" y "updatedAt"
});

const CommunityModel = model("communities", CommunitySchema);
export default CommunityModel;

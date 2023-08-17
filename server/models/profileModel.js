import mongoose from "mongoose";

export const profileSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  location: { type: String, required: false },
  interests: { type: String, required: false },
  avatar: {type: String, required: false, default: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"},
});

const profileModel = mongoose.model("Profile", profileSchema);
export default profileModel;
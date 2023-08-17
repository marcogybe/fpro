import mongoose from "mongoose";

export const googleProfileSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: false },
  interests: { type: String, required: false },
  avatar: {type: String, required: false},
});

const googleProfileModel = mongoose.model("googleProfile", googleProfileSchema);
export default googleProfileModel;
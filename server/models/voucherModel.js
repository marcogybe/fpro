import mongoose from "mongoose";

export const voucherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  card: { type: String, required: true },
  price: [{type: Number, required: true}],
  location: [{type: String, required: true}],
  description: [{ type: String, required: true}]
});

const voucherModel = mongoose.model("voucher", voucherSchema);
export default voucherModel;
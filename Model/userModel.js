const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  fee: { type: Number, required: true },
  feeType: {
    type: String,
    enum: ["One Month", "Three Months", "One Year"],
    required: true,
  },
  paymentDate: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

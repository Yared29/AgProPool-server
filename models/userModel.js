import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    kebele: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Kebele",
    },
    age: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    registeredBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["super_admin", "admin", "farmer", "farmer_agent", "mediator"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;

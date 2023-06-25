import mongoose from "mongoose";

const cropSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Crop = mongoose.model("Crop", cropSchema);

export default Crop;

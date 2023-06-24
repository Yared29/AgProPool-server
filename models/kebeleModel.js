import mongoose from "mongoose";

const kebeleSchema = mongoose.Schema(
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

const Kebele = mongoose.model("Kebele", kebeleSchema);

export default Kebele;

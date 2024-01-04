import mongoose from "mongoose";
const { Schema } = mongoose;

const ScriptSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    script: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Script", ScriptSchema);

import mongoose from "mongoose";
const { Schema } = mongoose;

const baWordSchema = new Schema(
  {
    userId: {
      type: String,
      // required: true,
    },
    theWord: {
      type: String,
      required: true,
    },
    TRANSLATION: {
      type: String,
      required: true,
    },
    // desc: {
    //   type: String,
    //   // required: true,
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BaWord", baWordSchema);

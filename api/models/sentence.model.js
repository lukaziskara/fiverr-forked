import mongoose from "mongoose";
const { Schema } = mongoose;

const SentenceSchema = new Schema(
  {
    // userId: {
    //   type: String,
    //   required: true,
    // },
    sentence: {
      type: String,
      // required: true,
    },
    translation: {
      type: String,
      // required: true,
    },
    words: {
      type: String,
      // required: true,
    },
    tWords: {
      type: String,
      // default: 0,
    },
    picture: {
      type: String,
      // default: 0,
    },
    theme: {
      type: String,
      // required: true,
    },
    // price: {
    //   type: Number,
    //   // required: true,
    // },
    // // cover: {
    // //   type: String,
    // //   // required: true,
    // // },
    // images: {
    //   type: [String],
    //   // required: false,
    // },
    // shortTitle: {
    //   type: String,
    //   // required: true,
    // },
    // shortDesc: {
    //   type: String,
    //   // required: true,
    // },
    // deliveryTime: {
    //   type: Number,
    //   // required: true,
    // },
    // revisionNumber: {
    //   type: Number,
    //   // required: true,
    // },
    // features: {
    //   type: [String],
    //   // required: false,
    // },
    // sales: {
    //   type: Number,
    //   default: 0,
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Sentence", SentenceSchema);

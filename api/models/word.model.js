import mongoose from "mongoose";
const { Schema } = mongoose;

const wordSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    word: {
      type: String,
      required: true,
    },
    translation: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      // required: true,
    },
    // totalStars: {
    //   type: Number,
    //   default: 0,
    // },
    // starNumber: {
    //   type: Number,
    //   default: 0,
    // },
    // cat: {
    //   type: String,
    //   // required: true,
    // },
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

export default mongoose.model("Word", wordSchema);

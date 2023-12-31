import mongoose from "mongoose";
const { Schema } = mongoose;

const VideoData = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    //   required: true,
    },
    shortTitle: {
      type: String,
      // required: true,
    },
    desc: {
      type: String,
      // required: true,
    },
    shortDesc: {
      type: String,
      // required: true,
    },
    features: {
      type: [String],
      // required: false,
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
    // cover: {
    //   type: String,
    //   // required: true,
    // },
    // images: {
    //   type: [String],
    //   // required: false,
    // },
    // deliveryTime: {
    //   type: Number,
    //   // required: true,
    // },
    // revisionNumber: {
    //   type: Number,
    //   // required: true,
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

export default mongoose.model("VideoData", VideoDataSchema);

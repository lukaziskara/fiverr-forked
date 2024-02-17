import mongoose from "mongoose";
const { Schema } = mongoose;

const VideoDataSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      //   required: true,
    },
    language: {
      type: String,
      //   required: true,
    },
    shortTitle: {
      type: String,
      // required: true,
    },
    desc: {
      type: Array,
      // required: true,
    },
    shortDesc: {
      type: String,
      // required: true,
    },
    images: {
      type: [String],
      // required: false,
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

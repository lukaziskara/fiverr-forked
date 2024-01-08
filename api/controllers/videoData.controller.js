import VideoData from "../models/videoData.model.js";
import createError from "../utils/createError.js";

export const createVideoData = async (req, res, next) => {
  // console.log("createVideoData", req.body);
  if (!req.isSeller)
    return next(createError(403, "Only sellers can create a VideoData!"));

  const rawData = req.body.desc.split("\n");
  // let i;
  const desc = [];
  for (let i = 0; i < rawData.length; i += 2) {
    let seconds = 0;
    const time = rawData[i].split(":");
    let line = rawData[i + 1];
    // if (line[line.length - 1] == "\n") console.log("caution");
    // else console.log("it is not");

    for (let j = 0; j < time.length; j++) {
      const power = time.length - 1 - j;
      seconds += Number(time[j] * 60 ** power);
    }
    if (i < rawData.length - 2) {
      const nextTime = rawData[i + 2].replace("\n", "").split(":");
      // console.log(typeof Number(nextTime[0]), Number(nextTime[0]),nextTime[0]);
      if (isNaN(Number(nextTime[0]))) {
        console.log("it works");
        line += " ";
        line += rawData[i + 2];
        i += 1;
        console.log(line,i);
      }
    }

    const lineData = {
      time: seconds,
      line: line,
    };
    desc.push(lineData);
    // console.log(i, time, seconds, line);
  }
  console.log(rawData.length, "dwad");
  // const striing = "adwads khnhbj hjjhgj hjiouhjiuwadwankjnda dwada"
  // console.log(req.body.desc,typeof(rawData),rawData,typeof(req.body.desc),striing.split(" "),typeof(striing.split(" ")))

  const newVideoData = new VideoData({
    userId: req.userId,
    ...req.body,
    desc,
  });
  // console.log("newData \n",newVideoData);
  try {
    const savedVideoData = await newVideoData.save();
    res.status(201).json(savedVideoData);
  } catch (err) {
    next(err);
  }
};
export const deleteVideoData = async (req, res, next) => {
  try {
    const videoData = await VideoData.findById(req.params.id);
    if (videoData.userId !== req.userId)
      return next(createError(403, "You can delete only your VideoData!"));

    await VideoData.findByIdAndDelete(req.params.id);
    res.status(200).send("VideoData has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getVideoData = async (req, res, next) => {
  console.log("kog");
  try {
    const videoData = await VideoData.findById(req.params.id);
    // console.log("kog",videoData);
    if (!videoData) next(createError(404, "VideoData not found!"));
    res.status(200).send(videoData);
  } catch (err) {
    next(err);
  }
};
export const getVideoDatas = async (req, res, next) => {
  const q = req.query;
  console.log("req", q, "getvideoDatas");
  // console.log("req", req, "res", res);
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    // const gigs = await Gig.find((el)=>{
    //   console.log(el,"ELEMENT")
    //   el.userId==q.userId}).sort({ [q.sort]: -1 });
    const videoDatas = await VideoData.find(filters).sort({ [q.sort]: -1 });
    // for(let i=0;i<videoDatas.length;i++){
    //   delete videoDatas[i].shortDesc;
    //   console.log("works",videoDatas[i].shortDesc)
    // }
    res.status(200).send(videoDatas);
    // console.log(videoDatas,"videodatas",videoDatas["title"]);
  } catch (err) {
    next(err);
  }
};

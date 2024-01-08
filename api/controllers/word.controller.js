import Word from "../models/word.model.js";
import Dictionary from "../models/dictionary.model.js";

export const createWord = async (req, res, next) => {
  // console.log("wordsState", req.body, "newWord");
  // const newWord = new Word({
  //   userId: req.userId,
  //   ...req.body,
  // });
  // console.log("wordsState", req.body, "newWord", newWord);
  // try {
  //   console.log("try1");
  //   const savedWord = await newWord.save();
  //   console.log("try2", savedWord);
  //   res.status(201).json(savedWord);
  //   // console.log("try3", savedWord);
  // } catch (err) {
  //   // console.log("err");
  //   next(err);
  // }
};
export const getWords = async (req, res, next) => {
  console.log(req.query.chosenWords, "getWords req");
  const q = {wTranslation: 'არარსებობა'};

  const filters = {
    ...(q.wTranslation && { wTranslation: q.wTranslation }),
  };
  console.log(filters)
  try {
    // const gigs = await Gig.find((el)=>{
    //   console.log(el,"ELEMENT")
    //   el.userId==q.userId}).sort({ [q.sort]: -1 });
    const videoDatas = await Word.find(filters).sort({ [q.sort]: -1 })
    //   const videoDatas = await Word.find({
    //   ...(theWord && { theWord: theWord }),
    // });
    // for(let i=0;i<videoDatas.length;i++){
    //   delete videoDatas[i].shortDesc;
    //   console.log("works",videoDatas[i].shortDesc)
    // }
    res.status(200).send(videoDatas);
    // console.log(videoDatas, "videodatas");
  } catch (err) {
    next(err);
  }
};
// export const getVideoData = async (req, res, next) => {
//   console.log("kog");
//   try {
//     const videoData = await VideoData.findById(req.params.id);
//     // console.log("kog",videoData);
//     if (!videoData) next(createError(404, "VideoData not found!"));
//     res.status(200).send(videoData);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getVideoDatas = async (req, res, next) => {
//   const q = req.query;
//   console.log("req", q, "getvideoDatas");
//   // console.log("req", req, "res", res);
//   const filters = {
//     ...(q.userId && { userId: q.userId }),
//     ...(q.cat && { cat: q.cat }),
//     ...((q.min || q.max) && {
//       price: {
//         ...(q.min && { $gt: q.min }),
//         ...(q.max && { $lt: q.max }),
//       },
//     }),
//     ...(q.search && { title: { $regex: q.search, $options: "i" } }),
//   };
//   try {
//     // const gigs = await Gig.find((el)=>{
//     //   console.log(el,"ELEMENT")
//     //   el.userId==q.userId}).sort({ [q.sort]: -1 });
//     const videoDatas = await VideoData.find(filters).sort({ [q.sort]: -1 });
//     // for(let i=0;i<videoDatas.length;i++){
//     //   delete videoDatas[i].shortDesc;
//     //   console.log("works",videoDatas[i].shortDesc)
//     // }
//     res.status(200).send(videoDatas);
//     // console.log(videoDatas,"videodatas",videoDatas["title"]);
//   } catch (err) {
//     next(err);
//   }
// };

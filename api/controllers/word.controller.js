import Word from "../models/word.model.js";

export const createWord = async (req, res, next) => {
  // console.log("wordsState", req.body, "newWord");

  const newWord = new Word({
    userId: req.userId,
    ...req.body,
  });
  console.log("wordsState", req.body, "newWord", newWord);
  try {
    console.log("try1");
    const savedWord = await newWord.save();
    console.log("try2", savedWord);
    res.status(201).json(savedWord);
    // console.log("try3", savedWord);
  } catch (err) {
    // console.log("err");
    next(err);
  }
};

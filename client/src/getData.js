// import tushetians from "./joined.json";
// import lexicon from "./lexicon.json";

// export function getData(NoS, NoP) {
//   const sentencesData = getSentences(NoS, NoP);
//   console.log(sentencesData);
//   // const parts = getPartsFromSentence(sentencesData);
//   console.log(sentencesData);
//   const wordsFromSentences = getWordsFromSentences(sentencesData);
//   const initialWords = getInitialWords(sentencesData);
//   const wordsfromLexicon = getWordsfromLexicon(initialWords);
//   console.log(initialWords, wordsfromLexicon, wordsFromSentences);
//   return {
//     sentencesData,
//     wordsFromSentences,
//     wordsfromLexicon,
//   };
// }

// export function getSentences(NoS, NoP) {
//   const sentencesWithPicture = tushetians.filter(
//     (sentence) => sentence.picture
//   );
//   const sentencesWithOutPicture = tushetians.filter(
//     (sentence) => !sentence.picture
//   );
//   console.log(NoP, sentencesWithPicture, sentencesWithOutPicture);
//   const randomSentences = [];

//   // სურათიანი წინადადებების არჩევა
//   for (let i = 0; i < NoP; i++) {
//     randomSentences.push(
//       sentencesWithPicture.splice(
//         Math.floor(Math.random() * sentencesWithPicture.length),
//         1
//       )[0]
//     );
//   }

//   // სურათის გარეშე წინადადებების არჩევა
//   for (let i = 0; i < NoS - NoP; i++) {
//     randomSentences.push(
//       sentencesWithOutPicture.splice(
//         Math.floor(Math.random() * sentencesWithOutPicture.length),
//         1
//       )[0]
//     );
//   }

//   processSentences(randomSentences);
//   return randomSentences;
// }

// function getWordsfromLexicon(initialWords) {
//   return initialWords.map((initialWord) =>
//     lexicon.find((wordData) => wordData.theWord == initialWord)
//       ? lexicon.find((wordData) => wordData.theWord == initialWord)
//       : initialWord + " - ERR"
//   );
// }

// function getInitialWords(sentencesData) {
//   const initialWords = [];
//   sentencesData.forEach((sentenceData) => {
//     sentenceData.initialWords.split("@").forEach((wordData) => {
//       initialWords.push(wordData);
//     });
//   });
//   return initialWords;
// }

// function processSentences(sentencesData) {
//   const marks = [",", ".", ":", ";", "!", "?"];
//   sentencesData.map(
//     (sentenceData, index) =>
//       (sentencesData[index].words = sentenceData.sentence
//         .split(" ")
//         .map((bWord) => {
//           const [newWord, mark] = marks.includes(bWord[bWord.length - 1])
//             ? [bWord.substring(0, bWord.length - 1), bWord[bWord.length - 1]]
//             : [bWord, ""];
//           return {
//             bWord: newWord,
//             pMark: mark,
//           };
//         }))
//   );
// }

// function getWordsFromSentences(sentencesData) {
//   const wordsFromSentences = [];
//   sentencesData.map((sentenceData, index) =>
//     sentenceData.words.map((bWord) => {
//       wordsFromSentences.push(bWord);
//     })
//   );
//   return wordsFromSentences;
// }

export function getShuffled(data) {
  console.log(data);
  return structuredClone(data).sort(() => 0.5 - Math.random());
}

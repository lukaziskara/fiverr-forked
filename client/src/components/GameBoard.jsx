import tushetians from "../joined.json";
import lexicon from "../lexicon.json"

export default function GameBoard() {
  console.log(tushetians);
  
  const randomSentences = [];
  for (let i = 0; i < 4; i++) {
    const randomNumber = Math.floor(Math.random() * tushetians.length);
    randomSentences.push(tushetians[randomNumber]);
    tushetians.splice(randomNumber, 1);
  }
  


  console.log(randomSentences,randomSentences.filter(sentence=>sentence.picture))
  return <>dwagfe</>;
}
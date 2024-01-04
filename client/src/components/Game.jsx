import { useMemo, useRef, useState } from "react";
import "../components/Components.css";
import GamePanel from "../components copy/GamePanel";
import Dictionary from "../components copy/Dictionary";
// import CreateSentences from "../components/CreateSentences";
// import WordsAndMarks from "../components/WordsAndMarks";
// import PartOfSpeech from "../components/PartsOfSpeech";

import Settings from "../components copy/GameSettings";
import Results from "../components copy/Results";
import About from "../components copy/About";
import about from "../about.json";
// import GuessPicture from "../components/GuessPicture";
// import TellPicture from "../components/TellPicture";
// import tushetians from "../joined.json";
// import lexicon from "../lexicon.json";

// import { getSentences, getData } from "../getData";
// const randomSentences = getSentences(4, 3);
// const data = getData(4, 1);
// const {randomSentences} = data;
function Game(props) {
  const [point, setPoint] = useState(0);
  const [tries, setTries] = useState(0);
  // const [openedGame, setOpenedGame] = useState(false);
  const [partOfGame, setPartOfGame] = useState(0);
  const [newGame, setNewGame] = useState(0);
  const [isVisibleBack, setIsVisibleBack] = useState(false);
  const [isVisibleFront, setIsVisibleFront] = useState(false);
  const [isBackVisible, setIsBackVisible] = useState(isVisibleFront);
  const [dictionarySettings, setDictionarySettings] = useState({
    firstPartState: "first_visible",
    secondPartState: "second_visible",
    thirdPartState: "third_visible",
  });

  // შემთხვევითად ამოირჩევა წინადადებები ყოველი თავიდან და დაიშლება ობიექტებად, რომლებიც wordsForCards მასივში მიმდევრობით ჩალაგდება
  const iSentence = useRef();
  const marksAmount = useRef(0);
  const wordsFromLexicon = props.wordsForGame;
  // console.log(wordsFromLexicon);

  // const {sentencesData,wordsFromSentences,wordsfromLexicon} = useMemo(()=> getData(4,1),[])
  console.log(wordsFromLexicon, props);
  // ძველი ნაწილი
  // const wordsForCards = useMemo(() => {
  //   const words = [];
  //   const tWords = [];
  //   for (let i = 0; i < randomSentences.length; i++) {
  //     iSentence.current = i;
  //     const sentence = randomSentences[i].sentence;
  //     const translatedWords = randomSentences[i].tWords;
  //     words.push(...sentence.split(" "));
  //     tWords.push(
  //       ...translatedWords.split("@").map((tWord, index) => ({
  //         tWord,
  //         isBack: false,
  //         sentenceIndex: i,
  //       }))
  //     );
  //   }
  //   marksAmount.current = 0;
  //   return words.map((value, index) => {
  //     let newWord;
  //     let newTrWord;
  //     let bPunctMark;
  //     let tPunctMark;
  //     const signsArray = words[index].split("");
  //     const marks = [",", ".", ":", ";", "!", "?"];
  //     if (marks.includes(signsArray[signsArray.length - 1])) {
  //       marksAmount.current += 1;
  //       bPunctMark = signsArray[signsArray.length - 1];
  //       newWord = words[index].substring(0, words[index].length - 1);
  //     } else {
  //       newWord = words[index];
  //     }
  //     newTrWord = tWords[index].tWord;
  //     if (tWords[index]) {
  //       return {
  //         backText: newWord,
  //         bPunctMark: bPunctMark ? bPunctMark : null,
  //         frontText: newTrWord,
  //         tPunctMark: tPunctMark ? tPunctMark : "",
  //         sentenceIndex: tWords[index].sentenceIndex,
  //         id: `s` + `${iSentence.current}` + `w` + `${index}`,
  //         isBack: false,
  //       };
  //     }
  //   });
  // }, [newGame]);

  console.log(
    "wordsForCards",
    // wordsForCards,
    "randomSentences",
    // sentencesData,
    "wordsFromLexicon"
    // wordsfromLexicon
  );
  return (
    <div className="chapter">
      <GamePanel
        point={point}
        setPoint={setPoint}
        tries={tries}
        setTries={setTries}
        partOfGame={partOfGame}
        setPartOfGame={setPartOfGame}
      />
      <About partOfGame={partOfGame} desc={about.partsOfGame[partOfGame]} />
      <div>
        {partOfGame === 0 ? (
          <div>
            <Settings
              newGame={newGame}
              setNewGame={setNewGame}
              dictionarySettings={dictionarySettings}
              setDictionarySettings={setDictionarySettings}
              setPoint={setPoint}
              setTries={setTries}
              setPartOfGame={setPartOfGame}
            />
          </div>
        ) : partOfGame === 1 ? (
          <div className="">
            <Dictionary
              point={point}
              setPoint={setPoint}
              tries={tries}
              setTries={setTries}
              firstPartState={dictionarySettings.firstPartState}
              secondPartState={dictionarySettings.secondPartState}
              thirdPartState={dictionarySettings.thirdPartState}
              cardsData={wordsFromLexicon}
              setPartOfGame={setPartOfGame}
              isVisibleFront={isVisibleFront}
              isVisibleBack={isVisibleBack}
            />
          </div>
        ) : partOfGame === 2 ? (
          // <div className="">
          {
            /* <CreateSentences
              point={point}
              setPoint={setPoint}
              tries={tries}
              setTries={setTries}
              wordsFromSentences={wordsFromSentences}
              isBackVisible={isBackVisible}
              sentencesData={sentencesData}
              setPartOfGame={setPartOfGame}
            />
          </div>
        ) : partOfGame === 3 ? (
          <div className="">
            <WordsAndMarks
              point={point}
              setPoint={setPoint}
              tries={tries}
              setTries={setTries}
              cardsData={wordsFromSentences}
              marksAmount={marksAmount.current}
              setPartOfGame={setPartOfGame}
            />
          </div>
        ) : partOfGame === 4 ? (
          <div className="">
            <GuessPicture
              sentences={sentencesData}
              point={point}
              setPoint={setPoint}
              tries={tries}
              setTries={setTries}
              setPartOfGame={setPartOfGame}
            />
          </div>
        ) : partOfGame === 5 ? (
          <div className="">
            <TellPicture
              point={point}
              setPoint={setPoint}
              tries={tries}
              setTries={setTries}
              wordsForCards={wordsFromSentences}
              isBackVisible={isBackVisible}
              sentences={sentencesData}
              setPartOfGame={setPartOfGame}
            />
          </div>
        ) : partOfGame === 6 ? (
          <div className="">
            <Results point={point} tries={tries} sentences={sentencesData} />
          </div> */
          }
        ) : null}
      </div>
    </div>
  );
}

export default Game;

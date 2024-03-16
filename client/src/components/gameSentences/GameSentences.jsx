import { useMemo, useRef, useState } from "react";
import "../Components.css";
import GamePanel from "../GamePanel";
import Dictionary from "../Dictionary/Dictionary";
import CreateSentences from "../CreateSentences/CreateSentences";
// import WordsAndMarks from "../components/WordsAndMarks";
// import PartOfSpeech from "../components/PartsOfSpeech";

import Settings from "../GameSettings";
import Results from "../Results";
import About from "../About";
import about from "../../about.json";

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
  const [gameType, setGameType] = useState("TRANSLATION");

  // შემთხვევითად ამოირჩევა წინადადებები ყოველი თავიდან და დაიშლება ობიექტებად, რომლებიც wordsForCards მასივში მიმდევრობით ჩალაგდება
  console.log(props);
  const iSentence = useRef();
  const marksAmount = useRef(0);
  const wordsFromLexicon = props.gameData.wordsFromLexicon;
  const chosenSentences = props.gameData.chosenSentences;
  const wordsFromSentences = props.gameData.wordsFromSentences;
  const sentencesData = useMemo(() => {
    const sentencesData = chosenSentences.map((el) => {
      const marks = [",", ".", ":", ";", "!", "?"];
      const words = el.sentence
        .replace('"', "")
        .replace('"', "")
        .replace('„', "")
        .replace('“', "")
        .replace("(", "")
        .replace(")", "")
        .split(" ")
        .map((word) => {
          const wordObj = {};
          if (marks.includes(word[word.length - 1])) {
            wordObj.word = word.substr(0,(word.length - 1));
            wordObj.mark = word[word.length - 1];
          }else{
            wordObj.word = word;
          }
          wordObj.isDone = "false"
          return wordObj;
        });
      return { ...el, words: words, isDone: false };
    });
    return sentencesData;
  }, []);

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
              setGameType={setGameType}
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
              gameType={gameType}
            />
          </div>
        ) : partOfGame === 2 ? (
          <div className="">
            <CreateSentences
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
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Game;

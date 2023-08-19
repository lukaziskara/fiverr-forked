import { useMemo, useRef, useState } from "react";
import "./Components.css";
import Dictionary from "./Dictionary";
import CreateSentences from "./CreateSentences";
import WordsAndMarks from "./WordsAndMarks";
import PartOfSpeech from "./PartsOfSpeech";

import Settings from "./GameSettings";
import Results from "./Results";
import About from "./About";
import about from "../about.json";
import GuessPicture from "./GuessPicture";
import TellPicture from "./TellPicture";

//კომპონენტს props-ებად მოეწოდება: value-შემთხვევითად არჩეული წინადადებები,
export default function Chapter(props) {
  const [point, setPoint] = useState(0);
  const [tries, setTries] = useState(0);
  // console.log(about);
  const [openedGame, setOpenedGame] = useState(false);
  const [partOfGame, setPartOfGame] = useState(0);
  const [newGame, setNewGame] = useState(0);
  const [isVisibleBack, setIsVisibleBack] = useState(false);
  const [isVisibleFront, setIsVisibleFront] = useState(false);
  const [isBackVisible, setIsBackVisible] = useState(isVisibleFront);
  const [dictionarySsettings, setDictionarySettings] = useState({
    firstPartState: "first_visible",
    secondPartState: "second_visible",
    thirdPartState: "third_visible",
  });

  const sentences = props.value;
  console.log(sentences.filter(sentence=>sentence.picture));
  console.log(sentences.filter(sentence=>sentence.picture||sentence.words));
  // შემთხვევითად ამოირჩევა წინადადებები ყოველი თავიდან და დაიშლება ობიექტებად, რომლებიც wordsForCards მასივში მიმდევრობით ჩალაგდება
  const iSentence = useRef();
  const marksAmount = useRef(0);
  // const dictionarySsettings = useRef(
  //   {
  //     firstPartState,
  //     secondPartState,
  //     thirdPartState,
  //   },
  //   [newGame]
  // );
  // console.log(dictionarySsettings);
  const wordsForCards = useMemo(() => {
    const words = [];
    const tWords = [];
    //
    for (let i = 0; i < sentences.length; i++) {
      iSentence.current = i;
      console.log("sentence", iSentence);
      const sentence = sentences[i].sentence;
      const translatedWords = sentences[i].tWords;
      // const test = sentence.split(" ").map((word, index) => {
      //   return {
      //     word,
      //     isBack: false,
      //     sentenceIndex: i,
      //   };
      // });
      // words.push(
      //   ...sentence.split(" ").map((word, index) => {
      //     return {
      //       word,
      //       isBack: false,
      //     };
      //   })
      // );
      words.push(...sentence.split(" "));
      tWords.push(
        ...translatedWords.split("@").map((tWord, index) => ({
          tWord,
          isBack: false,
          sentenceIndex: i,
        }))
      );
    }
    console.log(tWords);
    marksAmount.current = 0;
    return words.map((value, index) => {
      let newWord;
      let newTrWord;
      let bPunctMark;
      let tPunctMark;
      const signsArray = words[index].split("");
      const marks = [",", ".", ":", ";", "!", "?"];

      // console.log(signsArray[signsArray.length - 1]);
      if (marks.includes(signsArray[signsArray.length - 1])) {
        marksAmount.current += 1;
        bPunctMark = signsArray[signsArray.length - 1];
        newWord = words[index].substring(0, words[index].length - 1);
        // if (tWords[index]) {
        //   // newTrWord = tWords[index];
        //   // newWord = words[index].substring(0, words[index].length - 1);
        // }
        // words[index] = "dawfsef"
        console.log(marksAmount.current);
      } else {
        newWord = words[index];
        // if (tWords[index]) {
        // }
      }
      newTrWord = tWords[index].tWord;
      // console.log(newWord,words[index],newTrWord, marksAmount, "marksAmount")
      // for (let i = 0; i < signsArray.length; i++) {
      //     // (signsArray[i] === "ࣿ") ?
      //     //     newWord.push(<span className="span_element">{signsArray[i]}</span>) :
      //         if(marks.includes(signsArray[i])) {
      //             bPunctMark = signsArray[i];

      //         }else {
      //             newWord.push(signsArray[i]);
      //         }

      // }
      if (tWords[index]) {
        // const trSignsArray = tWords[index].split("");
        // for (let i = 0; i < trSignsArray.length; i++) {
        //     // (trSignsArray[i] === "ࣿ") ?
        //     // newTrWord.push(<span className="span_element">{trSignsArray[i]}</span>) :
        //     (marks.includes(trSignsArray[i])) ?
        //         bPunctMark = trSignsArray[i] :
        //         newTrWord.push(trSignsArray[i]);

        // }
        return {
          backText: newWord,
          bPunctMark: bPunctMark ? bPunctMark : null,
          frontText: newTrWord,
          tPunctMark: tPunctMark ? tPunctMark : "",
          sentenceIndex: tWords[index].sentenceIndex,
          // id: Math.floor(Math.random() * 10000),
          id: `s` + `${iSentence.current}` + `w` + `${index}`,
          isBack: false,
        };
      }
    });
  }, [newGame]);
  // const wordsForCS = useMemo(() => {
  //   console.log("useMemo", sentences);
  //   return sentences.map((sentence, index) => {
  //     const words = sentence.words.split("@");
  //     return sentence.tWords.split("@").map((tWord, index) => ({
  //       word: words[index],
  //       tWord,
  //       isBack: false,
  //       sentenceIndex: index,
  //     }));
  //   });
  // }, []);
  // const shuffledDataForCS = useMemo(() => {
  //   return wordsForCards
  //     .map((cardData) => {
  //       // console.log(cardData)
  //       return {
  //         frontText: cardData.frontText,
  //         backText: cardData.backText,
  //         id: cardData.id,
  //       };
  //     })
  //     .sort(() => 0.5 - Math.random());
  // }, []);
  console.log(wordsForCards, marksAmount.current);
  return (
    <div className="chapter">
      <div className="topic-div">
        <button
          onClick={() => {
            openedGame === false ? setOpenedGame(true) : setOpenedGame(false);
          }}
        >
          ჩამოშლა
        </button>
        <h2 className="topic_header">{props.topic}</h2>
        <div className="result">
          <div className="point">
            {point}
            <div className="qula">ქულა</div>
          </div>
          /
          <div className="tries">
            {tries}
            <div className="cda">ცდა</div>
          </div>
        </div>
        <div className="game_part_buttons">
          <button
            className={partOfGame === 0 ? "opened_game" : ""}
            onClick={() => {
              setPartOfGame(0);
            }}
          >
            S
          </button>
          <button
            className={partOfGame === 1 ? "opened_game" : ""}
            onClick={() => {
              setPartOfGame(1);
              setPoint(0);
              setTries(0);
            }}
          >
            I
          </button>
          <button
            className={partOfGame === 2 ? "opened_game" : "closed_game"}
            onClick={() => {
              setPartOfGame(2);
              setPoint(0);
              setTries(0);
            }}
          >
            II
          </button>
          <button
            className={partOfGame === 3 ? "opened_game" : "closed_game"}
            onClick={() => {
              setPartOfGame(3);
              setPoint(0);
              setTries(0);
            }}
          >
            III
          </button>
          <button
            className={partOfGame === 4 ? "opened_game" : "closed_game"}
            onClick={() => {
              setPartOfGame(4);
              setPoint(0);
              setTries(0);
            }}
          >
            IV
          </button>
          <button
            className={partOfGame === 5 ? "opened_game" : "closed_game"}
            onClick={() => {
              setPartOfGame(5);
              // console.log("test");
              setPoint(0);
              setTries(0);
            }}
          >
            V
          </button>
          <button
            className={partOfGame === 6 ? "opened_game" : "closed_game"}
            onClick={() => {
              setPartOfGame(0);
              // console.log("test");
              setPoint(0);
              setTries(0);
            }}
          >
            R
          </button>
        </div>
      </div>
      <div>
        {openedGame ? (
          partOfGame === 0 ? (
            <div className="">
              <About
                partOfGame={partOfGame}
                desc={about.partsOfGame[partOfGame]}
              />
              <Settings
                newGame={newGame}
                setNewGame={setNewGame}
                dictionarySsettings={dictionarySsettings}
                setDictionarySettings={setDictionarySettings}
                setPoint={setPoint}
                setTries={setTries}
                setPartOfGame={setPartOfGame}
              />
            </div>
          ) : partOfGame === 1 ? (
            <div className="">
              <About
                partOfGame={partOfGame}
                desc={about.partsOfGame[partOfGame]}
              />
              <Dictionary
                newGame={newGame}
                point={point}
                setPoint={setPoint}
                tries={tries}
                setTries={setTries}
                firstPartState={dictionarySsettings.firstPartState}
                secondPartState={dictionarySsettings.secondPartState}
                thirdPartState={dictionarySsettings.thirdPartState}
                cardsData={wordsForCards}
                setPartOfGame={setPartOfGame}
                isVisibleFront={isVisibleFront}
                isVisibleBack={isVisibleBack}
                sentences={sentences}
              />
            </div>
          ) : partOfGame === 2 ? (
            <div className="">
              <About
                partOfGame={partOfGame}
                desc={about.partsOfGame[partOfGame]}
              />
              <CreateSentences
                point={point}
                setPoint={setPoint}
                tries={tries}
                setTries={setTries}
                // shuffledDataForCS={shuffledDataForCS}
                // wordsForCS={wordsForCS}
                wordsForCards={wordsForCards}
                isBackVisible={isBackVisible}
                sentences={sentences}
                setPartOfGame={setPartOfGame}
              />
            </div>
          ) : partOfGame === 3 ? (
            <div className="">
              <About
                partOfGame={partOfGame}
                desc={about.partsOfGame[partOfGame]}
              />
              <WordsAndMarks
                point={point}
                setPoint={setPoint}
                tries={tries}
                setTries={setTries}
                cardsData={wordsForCards}
                marksAmount={marksAmount.current}
                setPartOfGame={setPartOfGame}
              />
            </div>
          ) : partOfGame === 4 ? (
            <div className="">
              <About
                partOfGame={partOfGame}
                desc={about.partsOfGame[partOfGame]}
              />
              <GuessPicture
              // point={point}
              // setPoint={setPoint}
              // tries={tries}
              // setTries={setTries}
              // cardsData={wordsForCards}
              // marksAmount={marksAmount.current}
              />
            </div>
          ) : partOfGame === 5 ? (
            <div className="">
              <About
                partOfGame={partOfGame}
                desc={about.partsOfGame[partOfGame]}
              />
              <TellPicture />
            </div>
          ) : partOfGame === 6 ? (
            <div className="">
              <About
                partOfGame={partOfGame}
                desc={about.partsOfGame[partOfGame]}
              />
              <Results
                point={point}
                // setPoint={setPoint}
                tries={tries}
                // setTries={setTries}
                sentences={sentences}
                // marksAmount={marksAmount.current}
              />
            </div>
          ) : (
            console.log(openedGame)
          )
        ) : null}
      </div>
    </div>
  );
}

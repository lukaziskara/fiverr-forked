import { useMemo, useRef, useState } from "react";
import "../components/Components.css";
import Dictionary from "../components/Dictionary/Dictionary";
import CreateSentences from "../components/CreateSentences/CreateSentences";
import WordsAndMarks from "../components/WordsAndMarks/WordsAndMarks";
import PartOfSpeech from "../components/PartsOfSpeech";

import Settings from "../components/GameSettings";
import Results from "../components/Results";
import About from "../components/About";
import about from "../about.json";
import GuessPicture from "../components/GuessPicture";
import TellPicture from "../components/TellPicture";

import tushetians from "../joined.json";
import lexicon from "../lexicon.json";

function Game() {
  const [point, setPoint] = useState(0);
  const [tries, setTries] = useState(0);
  const [openedGame, setOpenedGame] = useState(false);
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
  const randomSentences = useMemo(() => {
    const randomSentences = [];
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * tushetians.length);
      randomSentences.push(tushetians[randomNumber]);
      tushetians.splice(randomNumber, 1);
      // console.log(randomSentences, randomNumber);
    }
    return randomSentences;
  }, [newGame]);
  // შემთხვევითად ამოირჩევა წინადადებები ყოველი თავიდან და დაიშლება ობიექტებად, რომლებიც wordsForCards მასივში მიმდევრობით ჩალაგდება
  const iSentence = useRef();
  const marksAmount = useRef(0);
  //სიტყვები ცალ-ცალკე წინადადებებიდან
  const wordsFromSentences = useMemo(() => {
    // const bWords = [];
    const marks = [",", ".", ":", ";", "!", "?"];
    return randomSentences.map((sentence) =>
      sentence.sentence.split(" ").map((bWord) => {
        const [newWord, mark] = marks.includes(bWord[bWord.length - 1])
          ? [bWord.substring(0, bWord.length - 1), bWord[bWord.length - 1]]
          : [bWord, ""];
        // bWord[bWord.length - 1] = "";
        return {
          bWord: newWord,
          pMark: mark,
        };
      })
    );
  }, [newGame]);
  //სიტყვები წინადადებებიდან. გაერთიანებული

  const allWords = useMemo(() => wordsFromSentences.flat(), [newGame]);
  console.log(allWords);
  //ლექსიკონიდან
  const wordsFromLexicon = useMemo(() => {
    return allWords.map((fromSentences) => {
      // console.log(fromSentences);
      let variations = "";
      const fromLexicon = lexicon.find((reqWord) => {
        // console.log("reqWord", reqWord);
        if (reqWord.theWord === fromSentences.bWord) {
          variations += reqWord.wTranslation + ",";
          console.log(reqWord, fromSentences.pMark);

          return reqWord;
        }
      });
      // return reqWord.translation;
      // });
      console.log(fromLexicon);
      return { ...fromLexicon, pMark: fromSentences.pMark };
      // allWords.map((fullWord, index) => ({
      //   word: fromLexicon[index],
      //   tword: fullWord,
      // }));
    });
  }, [newGame]);
  console.log(
    wordsFromSentences,
    allWords,
    "wordsFromLexicon",
    wordsFromLexicon
  );
  const marksFromSentence = useMemo(() =>
    wordsFromSentences.map((word) => {
      // console.log(word);
    })
  );

  // ძველი ნაწილი
  const wordsForCards = useMemo(() => {
    const words = [];
    const tWords = [];
    //
    for (let i = 0; i < randomSentences.length; i++) {
      iSentence.current = i;
      // console.log("sentence", iSentence);
      const sentence = randomSentences[i].sentence;
      const translatedWords = randomSentences[i].tWords;
      words.push(...sentence.split(" "));
      tWords.push(
        ...translatedWords.split("@").map((tWord, index) => ({
          tWord,
          isBack: false,
          sentenceIndex: i,
        }))
      );
    }
    // console.log(tWords);
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
        // console.log(marksAmount.current);
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
  // // }, []);
  console.log(wordsForCards, marksAmount.current);
  return (
    <div className="chapter">
      <div className="topic-div">
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
        {
          // openedGame ? (
          partOfGame === 0 ? (
            <div>
              <About
                partOfGame={partOfGame}
                desc={about.partsOfGame[partOfGame]}
              />
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
              <About
                partOfGame={partOfGame}
                desc={about.partsOfGame[partOfGame]}
              />
              <Dictionary
                // newGame={newGame}
                point={point}
                setPoint={setPoint}
                tries={tries}
                setTries={setTries}
                firstPartState={dictionarySettings.firstPartState}
                secondPartState={dictionarySettings.secondPartState}
                thirdPartState={dictionarySettings.thirdPartState}
                cardsData={wordsFromLexicon}
                // cardsData={wordsForCards}
                setPartOfGame={setPartOfGame}
                isVisibleFront={isVisibleFront}
                isVisibleBack={isVisibleBack}
                sentences={randomSentences}
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
                sentences={randomSentences}
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
                sentences={randomSentences}
                // marksAmount={marksAmount.current}
              />
            </div>
          ) : (
            console.log(openedGame)
          )
          // ) : null
        }
      </div>
    </div>
  );
}

export default Game;

import { useEffect, useMemo, useRef, useState } from "react";
import { getShuffled } from "../../getData";
import "./CreateSentences.scss";

export default function CreateSentences(props) {
  const { point, setPoint, tries, setTries, setPartOfGame, sentencesData } =
    props;
  const [clickedWord, setClickedWord] = useState(false);
  const [sentenceToFill, setSentenceToFill] = useState(0);
  const [isCelebration, setIsCelebration] = useState(false);
  const [placeToFillId, setPlaceToFillId] = useState(0);
  const [currentSentence, setCurrentSentence] = useState(0);
  const wordToReturn = useRef();
  const wordToReturnIndex = useRef();
  const sentenceToGo = useRef(4);

  const shuffledSentencesData = useMemo(() => {
    return getShuffled(sentencesData);
  }, []);
  const shuffledDataForCS = useMemo(() => {
    const words = sentencesData
      .map((el) => el.words)
      .flat()
      .sort(() => 0.5 - Math.random());
    return words;
  }, []);
  const wonSentences = useMemo(() => [], []);

  function clickHandler(word, index) {
    if (placeToFillId < shuffledSentencesData[currentSentence].words.length) {
      wordToReturn.current = word;
      wordToReturnIndex.current = index;
      if (
        wordToReturn.current ==
        shuffledSentencesData[currentSentence].words[placeToFillId].word
      ) {
        console.log("დაემთხვა");
        setPoint(point + 1);
        setTries(tries + 1);
        shuffledSentencesData[currentSentence].words[
          placeToFillId
        ].isDone = true;
        setPlaceToFillId(placeToFillId + 1);
        shuffledDataForCS.splice(index, 1);
        setClickedWord(null);
      } else {
        console.log("ააააააააააააარ დაემთხვა");
        setTries(tries + 1);
        setClickedWord(index);
      }
    }
  }

  useEffect(() => {
    console.log(
      "useEffect",
      placeToFillId == shuffledSentencesData[currentSentence].words.length
    );
    if (placeToFillId == shuffledSentencesData[currentSentence].words.length) {
      setIsCelebration(true);
      setPlaceToFillId(0);
      setSentenceToFill(sentenceToFill + 1);
      setTimeout(() => {
        setIsCelebration(false);
        wonSentences.push(shuffledSentencesData[currentSentence]);
        setCurrentSentence(currentSentence + 1);
      }, 3000);
      console.log("წინადადება შეივსო", wonSentences);
    }
  }, [placeToFillId]);
  return (
    <div className="words_and_sentences">
      <div className="sentences">
        {sentenceToFill < shuffledSentencesData.length ? (
          <div className={isCelebration ? "celebration" : ""}>
            <div className="to_translate">
              {shuffledSentencesData[currentSentence].translation}
            </div>
            <div className="build_here">
              {shuffledSentencesData[currentSentence].words.map((el, index) => (
                <div className="">
                  <div
                    className={
                      shuffledSentencesData[currentSentence].words[index].isDone
                        ? "word_returned"
                        : "word_for_sentence"
                    }
                  >
                    {shuffledSentencesData[currentSentence].words[index].isDone
                      ? el.word
                      : "დოშ"}
                  </div>
                  <div className=""></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="">
            <button onClick={() => setPartOfGame(3)}>შემდეგი ეტაპი</button>
          </div>
        )}
      </div>
      <div className="words_for_sentence">
        {shuffledDataForCS.map((el, index) => (
          <div
            className={
              clickedWord === index
                ? "card_to_choose clicked_card_to_choose"
                : "card_to_choose"
            }
            onClick={() => clickHandler(el.word, index)}
          >
            <div className="">{el.word}</div>
          </div>
        ))}
      </div>
      <div className="next_game">
        {currentSentence == shuffledSentencesData.length ? (
          <button onClick={() => setPartOfGame(3)}>შემდეგი ეტაპი</button>
        ) : null}
      </div>
      <div className="won_sentences">
        {wonSentences.map((el) => (
          <div className="">
            <div className="">{el.sentence}</div>
            <div className="">{el.translation}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

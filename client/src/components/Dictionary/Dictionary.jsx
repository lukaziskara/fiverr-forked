import { useState, useRef, useMemo, useEffect } from "react";
import "./Dictionary.scss";
// import LeftCard from "./LeftCard";
// import RightCard from "./RightCard";
import React from "react";
import { getShuffled } from "../../getData";

export default function Dictionary(props) {
  // props-ების დესტრუქტურიზაცია
  const {
    setPartOfGame, // stage
    firstPartState, //
    secondPartState,
    thirdPartState,
    cardsData,
  } = props;
  console.log(props);
  const leftBack = useRef();
  const rightBack = useRef();
  const leftId = useRef();
  const rightId = useRef();

  const [clickedRightCardId, setClickedRightCardId] = useState();
  const [clickedLeftCardId, setClickedLeftCardId] = useState();
  const [isFixedVisible, setIsFixedVisible] = useState(false);
  const [wonWord, setWonWord] = useState([{ theWord: "", TRANSLATION: "" }]);
  // const [visibleBackIndex, setVisibleBackIndex] = useState();
  // const [clickedSentence, setClickedSentence] = useState(false);
  const [isSecond, setIsSecond] = useState(false);

  const shuffledDataForLeft = useMemo(() => getShuffled(cardsData), []);
  const shuffledDataForRight = useMemo(() => getShuffled(cardsData), []);
  const wonWords = useMemo(() => [], []);

  function clickHandler(cardData, index, side) {
    // console.log(cardData, index, side, "dwadefserfes");
    if (side == "left") {
      leftBack.current = cardData.theWord;
      // frontTextId.current = index;
      setClickedLeftCardId(index);
      leftId.current = index;
    }
    if (side == "right") {
      rightBack.current = cardData.theWord;
      // theWordId.current = index;
      setClickedRightCardId(index);
      rightId.current = index;
    }
    console.log(leftBack.current, rightBack.current);
    if (leftBack.current === rightBack.current) {
      props.setPoint(props.point + 1);
      props.setTries(props.tries + 1);
      wonWords.push(shuffledDataForLeft.splice(leftId.current, 1)[0]);
      setWonWord(shuffledDataForRight.splice(rightId.current, 1));
      setIsFixedVisible(true);
      rightBack.current = null;
      leftBack.current = null;
      setClickedLeftCardId(null);
      setClickedRightCardId(null);
      if (isSecond) {
        setIsSecond(false);
      }
      setTimeout(() => {
        setIsFixedVisible(false);
      }, 3000);
    } else {
      if (isSecond) {
        props.setTries(props.tries + 1);
      } else {
        setIsSecond(true);
      }
    }
    console.log(wonWord);
  }
  return (
    <>
      <div className="dictionary">
        <div className="t_words flex_wrap">
          {shuffledDataForLeft.map((cardData, index) => (
            <div
              className={
                clickedLeftCardId === index
                  ? "card clicked_left"
                  : "card left_card"
              }
              onClick={() => {
                clickHandler(cardData, index, "left");
              }}
            >
              <div className={firstPartState}>{cardData.TRANSLATION}</div>
              <div className={secondPartState}>{cardData.theWord}</div>
            </div>
          ))}
          <div className={isFixedVisible ? "fixed-won-word" : "hidden"}>
            {wonWord[0].TRANSLATION} - {wonWord[0].theWord}
          </div>
        </div>
        <div className="b_words flex_wrap">
          <div className="position-fixed-right hidden">word</div>
          {shuffledDataForRight.map((cardData, index) => (
            <div
              className={
                clickedRightCardId === index
                  ? "card clicked_right"
                  : "card right_card"
              }
              id={cardData.index}
              onClick={() => clickHandler(cardData, index, "right")}
            >
              <div>
                <div className={thirdPartState}>{cardData.theWord}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="end_game">
        <div className="won_words">
          {wonWords.map((wonWord, index) => (
            <div className="won_word">
              <div>{wonWord.TRANSLATION}</div> - <div>{wonWord.theWord}</div>
            </div>
          ))}
        </div>
        <div className="next_game">
          {shuffledDataForLeft.length === 0 ? (
            <button onClick={() => setPartOfGame(2)}>შემდეგი ეტაპი</button>
          ) : null}
        </div>
      </div>
    </>
  );
}

import { useState, useRef, useMemo } from "react";
import LeftCard from "./LeftCard";
import RightCard from "./RightCard";
import React from "react";
import { getShuffled } from "../getData";

export default function Dictionary(props) {
  // props-ების დესტრუქტურიზაცია
  const {
    setPartOfGame, // stage
    firstPartState, //
    secondPartState,
    thirdPartState,
    cardsData,
  } = props;

  const leftBack = useRef();
  const rightBack = useRef();
  // const frontTextId = useRef();
  // const theWordId = useRef();

  const [clickedRightCardId, setClickedRightCardId] = useState();
  const [clickedLeftCardId, setClickedLeftCardId] = useState();
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
    }
    if (side == "right") {
      rightBack.current = cardData.theWord;
      // theWordId.current = index;
      setClickedRightCardId(index);
    }
    if (leftBack.current === rightBack.current) {
      props.setPoint(props.point + 1);
      props.setTries(props.tries + 1);
      wonWords.push(shuffledDataForLeft.splice(clickedLeftCardId, 1)[0]);
      shuffledDataForRight.splice(clickedRightCardId, 1);
      rightBack.current = null;
      leftBack.current = null;
      setClickedLeftCardId(null);
      setClickedRightCardId(null);
      if (isSecond) {
        setIsSecond(false);
      }
    } else {
      if (isSecond) {
        props.setTries(props.tries + 1);
      } else {
        setIsSecond(true);
      }
    }
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
              <div className={firstPartState}>{cardData.wTranslation}</div>
              <div className={secondPartState}>{cardData.theWord}</div>
            </div>
          ))}
        </div>
        <div className="b_words flex_wrap">
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
              <div>{wonWord.wTranslation}</div> - <div>{wonWord.theWord}</div>
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

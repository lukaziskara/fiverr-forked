import { useState, useRef, useMemo } from "react";
import LeftCard from "../LeftCard";
import RightCard from "../RightCard";
import React from "react";

export default function Dictionary(props) {
  const {
    newGame,
    setPartOfGame,
    firstPartState,
    secondPartState,
    thirdPartState,
    cardsData,
  } = props;
  const wonWords = useRef([]);
  const leftBack = useRef();
  const rightBack = useRef();
  const frontTextId = useRef();
  const theWordId = useRef();

  const [clickedRightCardId, setClickedRightCardId] = useState();
  const [clickedLeftCardId, setClickedLeftCardId] = useState();
  const [visibleBackIndex, setVisibleBackIndex] = useState();
  const [clickedSentence, setClickedSentence] = useState(false);
  const [isSecond, setIsSecond] = useState(false);

  const shuffledDataForLeft = useMemo(() => {
    return cardsData
      .map((cardData) => {
        // console.log(cardData);
        return {
          TRANSLATION: cardData.TRANSLATION,
          theWord: cardData.theWord,
          id: cardData.index,
        };
      })
      .sort(() => 0.5 - Math.random());
  }, []);
  const shuffledDataForRight = useMemo(() => {
    return cardsData
      .map((cardData) => {
        return {
          TRANSLATION: cardData.TRANSLATION,
          theWord: cardData.theWord,
          id: cardData.index,
        };
      })
      .sort(() => 0.5 - Math.random());
  }, []);
  // console.log(shuffledDataForLeft, shuffledDataForRight);
  // console.log(wonWords)
  return (
    <>
      <div className="dictionary">
        <div className="t_words flex_wrap">
          {shuffledDataForLeft.map(
            (cardData, index) => (
              <div
                className={
                  clickedLeftCardId === cardData.id
                    ? "card clicked_left"
                    : "card left_card"
                }
                onClick={() => {
                  // leftBack.current = "dwafesdr"
                  leftBack.current = cardData.theWord;
                  frontTextId.current = index;
                  console.log(cardData);
                  if (leftBack.current === rightBack.current) {
                    console.log(rightBack.current);
                  }
                  if (leftBack.current === rightBack.current) {
                    props.setPoint(props.point + 1);
                    props.setTries(props.tries + 1);
                    wonWords.current.push(cardData);
                    shuffledDataForLeft.splice(frontTextId.current, 1);
                    shuffledDataForRight.splice(theWordId.current, 1);
                    rightBack.current = null;
                    leftBack.current = null;
                    if (isSecond) {
                      setIsSecond(false);
                    }
                  } else {
                    if (isSecond) {
                      props.setTries(props.tries + 1);
                      console.log(isSecond);
                    } else {
                      setIsSecond(true);
                    }
                  }
                  setClickedLeftCardId(cardData.id);
                }}
              >
                <div className={firstPartState}>{cardData.TRANSLATION}</div>
                <div className={secondPartState}>{cardData.theWord}</div>
              </div>
            )
            // <LeftCard back={cardData.theWord} front={cardData.TRANSLATION} key={index} />
          )}
        </div>
        <div className="b_words flex_wrap">
          {shuffledDataForRight.map((cardData, index) => (
            <div
              className={
                clickedRightCardId === cardData.id
                  ? "card clicked_right"
                  : "card right_card"
              }
              id={cardData.id}
              onClick={() => {
                rightBack.current = cardData.theWord;
                theWordId.current = index;
                console.log(rightBack.current, leftBack.current);
                setClickedRightCardId(cardData.id);
                if (leftBack.current === rightBack.current) {
                  props.setPoint(props.point + 1);
                  props.setTries(props.tries + 1);
                  wonWords.current.push(cardData);
                  shuffledDataForLeft.splice(frontTextId.current, 1);
                  shuffledDataForRight.splice(theWordId.current, 1);
                  rightBack.current = null;
                  leftBack.current = null;
                  if (isSecond) {
                    setIsSecond(false);
                  }
                } else {
                  if (isSecond) {
                    props.setTries(props.tries + 1);
                    console.log(isSecond);
                  } else {
                    setIsSecond(true);
                  }
                }
              }}
            >
              <div>
                <div className={thirdPartState}>{cardData.theWord}</div>
              </div>
              {/* <RightCard isVisible={visibleBackIndex} back={cardData.theWord} index={index} onClick={whenBackCardClicked} key={index} /> */}
            </div>
          ))}
        </div>
      </div>
      <div className="end_game">
        <div className="won_words">
          {wonWords.current.map((wonWord, index) => (
            <div className="won_word">
              <div>{wonWord.TRANSLATION}</div> - <div>{wonWord.theWord}</div>
            </div>
          ))}
        </div>
        <div className="next_game">
          {shuffledDataForLeft.length === 0 ? (
            <button onClick={() => setPartOfGame(2)}>შემდეგი ეტაპი</button>
          ) : (
            console.log(wonWords.length, wonWords.length === 2)
          )}
        </div>
      </div>
    </>
  );
}

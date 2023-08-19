import { useMemo, useRef, useState } from "react";

export default function WordsAndMarks(props) {
  console.log(props.marksAmount);
  const cardsData = props.cardsData;
  // props.marksAmount
  const [clickedWord, setClickedWord] = useState();
  const [clickedMark, setClickedMark] = useState();
  const chosenMark = useRef();
  const marksAmount = useRef(props.marksAmount);
  // marksAmount.current--;
  console.log(props.marksAmount, marksAmount.current);
  const wordsAndMarks = useMemo(() => {
    return cardsData.map((cardData) => {
      // console.log(cardData)
      return {
        word: cardData.backText,
        mark: cardData.bPunctMark,
        wordOrMark: "word",
        markClassName: "mark",
      };
    });
  }, []);
  // console.log(chosenMark,wordsAndMarks)
  return (
    <div className="words_and_marks">
      <div className="words_wout_marks">
        {wordsAndMarks.map((cardData, index) =>
          cardData.wordOrMark === "word" ? (
            <div
              className={
                clickedWord === index
                  ? "word_wout_mark clicked_word"
                  : "word_wout_mark"
              }
              onClick={() => {
                // console.log("ახლა შედარდება",chosenMark.current,cardData.mark)
                if (chosenMark.current === cardData.mark) {
                  // console.log("დაემთხვა")
                  wordsAndMarks.splice(index + 1, 0, {
                    word: null,
                    mark: cardData.mark,
                    wordOrMark: "mark",
                  });
                  // setClickedMark(false)
                  setClickedWord(false);
                  props.setPoint(props.point + 1);
                  props.setTries(props.tries + 1);
                  cardData.mark = null;
                  chosenMark.current = NaN;
                  marksAmount.current -= 1;
                  console.log(marksAmount.current);
                  // setClickedWord(NaN)
                } else {
                  props.setTries(props.tries + 1);
                  setClickedWord(index);
                }
              }}
            >
              {cardData.word}
              <div className="div"></div>
            </div>
          ) : (
            <div className="mark_among_words">{cardData.mark}</div>
          )
        )}
      </div>
      <div className="marks">
        {wordsAndMarks.map((cardData, index) =>
          cardData.wordOrMark === "word" && cardData.mark ? (
            <div
              className={clickedMark === index ? "mark clicked_mark" : "mark"}
              onClick={() => {
                // console.log("cgcgffchjbjg");
                chosenMark.current = cardData.mark;
                setClickedMark(index);
                setClickedWord(false);
              }}
            >
              {cardData.mark}
            </div>
          ) : (
            console.log()
          )
        )}
      </div>
      {marksAmount.current === 0 ? (
        <div className="next">
          <button onClick={() => props.setPartOfGame(6)}>შედეგები</button>
          <button onClick={() => props.setPartOfGame(4)}>შემდეგი ეტაპი</button>
        </div>
      ) : (
        console.log(marksAmount.current, "test")
      )}
    </div>
  );
}

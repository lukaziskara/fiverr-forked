import { useMemo, useRef, useState } from "react";
import "./WordsAndMarks.scss";

export default function WordsAndMarks(props) {
  const { sentencesData } = props;
  // console.log(props.marksAmount);
  const cardsData = props.cardsData;
  // props.marksAmount
  const [clickedWord, setClickedWord] = useState();
  const [clickedMark, setClickedMark] = useState();
  const markAfterWord = useRef();
  const chosenMark = useRef();
  const marksAmount = useRef(props.marksAmount);
  // marksAmount.current--;
  const wordsWithMarks = useMemo(() => {
    const words = sentencesData
      .map((el) => el.words)
      .sort(() => 0.5 - Math.random())
      .flat();
    return words;
  }, []);
  const marks = useMemo(() => {
    const marks = [];
    wordsWithMarks.forEach((el) => {
      if (el.mark) {
        marks.push({ mark: el.mark, typeOfSign: "mark" });
      }
    });
    return marks;
  }, []);
  // console.log(wordsWithMarks, marks);
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

  function clickHendler(el, index, wordOrMark) {
    console.log("word", markAfterWord.current, "mark", chosenMark.current);
    // console.log("კლიკი", el);
    if (wordOrMark == "word") {
      markAfterWord.current = el.mark ? el.mark : false;
      console.log("კლიკი", markAfterWord.current);
      //   if (el.mark) {
      //   markAfterWord.current = el.mark;
      // } else {
      //   markAfterWord.current = false;
      // }
      setClickedWord(index);
      // console.log("ახლა შედარდება", chosenMark.current, el.mark);
    } else if (wordOrMark == "mark") {
      chosenMark.current = el.mark;
      setClickedMark(index);
    }
    console.log(markAfterWord.current, chosenMark.current);
    if (markAfterWord.current == chosenMark.current) {
      console.log("დაემთხვა", wordsWithMarks[clickedWord]);
      wordsWithMarks.splice(index + 1, 0, {
        word: "",
        mark: el.mark,
        wordOrMark: "mark",
      });
      console.log(wordsWithMarks[clickedWord].mark, "mark");
      wordsWithMarks[clickedWord].mark = "";
      marks.splice(clickedMark, 1);
      setClickedMark(false);
      setClickedWord(false);
      console.log("დაემთხვა, შემდეგ", wordsWithMarks);

      // // setClickedMark(false)
      // props.setPoint(props.point + 1);
      // props.setTries(props.tries + 1);
      // el.mark = null;
      // chosenMark.current = NaN;
      // marksAmount.current -= 1;
      // console.log(marksAmount.current);
      // // setClickedWord(NaN)
    } else {
      // props.setTries(props.tries + 1);
      // setClickedWord(index);
    }
  }
  // console.log(chosenMark,wordsAndMarks)
  return (
    <div className="words_and_marks">
      <div className="words_wout_marks">
        {wordsWithMarks.map((el, index) => (
          <div className="">
            {el.word ? (
              <div
                className={
                  clickedWord === index ? "word_card clicked_card" : "word_card"
                }
                onClick={() => {
                  clickHendler(el, index, "word");
                }}
              >
                {el.word}
                {/* <div className="div"></div> */}
              </div>
            ) : (
              <div className="mark_among_words">{el.mark}</div>
            )}
          </div>
          // )
        ))}
      </div>
      <div className="marks">
        {marks.map((el, index) => (
          <div
            className={clickedMark === index ? "mark clicked_mark" : "mark"}
            onClick={() => {
              clickHendler(el, index, "mark");
            }}
          >
            {el.mark}
          </div>
        ))}
      </div>
      {/* {
        marksAmount.current === 0 ? (
          <div className="next">
            <button onClick={() => props.setPartOfGame(6)}>შედეგები</button>
            <button onClick={() => props.setPartOfGame(4)}>
              შემდეგი ეტაპი
            </button>
          </div>
        ) : null
        // console.log(marksAmount.current, "test")
      } */}
    </div>
  );
}

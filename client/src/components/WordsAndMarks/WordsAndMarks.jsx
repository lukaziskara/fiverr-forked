import { useMemo, useRef, useState } from "react";
import "./WordsAndMarks.scss";

export default function WordsAndMarks(props) {
  const { sentencesData, point, setPoint, tries, setTries, setPartOfGame } =
    props;
  const [clickedWord, setClickedWord] = useState();
  const [clickedMark, setClickedMark] = useState();
  const [isSecond, setIsSecond] = useState(false);

  const markAfterWord = useRef();
  const chosenMark = useRef();
  const wordId = useRef();
  const markId = useRef();
  const wordsWithMarks = useMemo(() => {
    console.log(sentencesData)
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

  function clickHendler(el, index, wordOrMark) {
    console.log("მინიჭებამდე");
    if (wordOrMark == "word") {
      markAfterWord.current = el.mark ? el.mark : false;
      wordId.current = index;
      setClickedWord(index);
      console.log("კლიკი", markAfterWord.current);
    } else if (wordOrMark == "mark") {
      chosenMark.current = el.mark;
      markId.current = index;
      setClickedMark(index);
    }
    console.log("შედარდება",wordsWithMarks,markAfterWord.current,chosenMark.current,markAfterWord.current == chosenMark.current);
    if (markAfterWord.current == chosenMark.current) {
      console.log("დაემთხვა", wordsWithMarks[wordId.current]);
      wordsWithMarks.splice(wordId.current + 1, 0, {
        word: "",
        mark: el.mark,
        wordOrMark: "mark",
      });
      console.log(wordsWithMarks[wordId.current].mark, "wordmark");
      wordsWithMarks[clickedWord].mark = "";
      marks.splice(markId.current, 1);
      markAfterWord.current = null;
      wordId.current = null;
      chosenMark.current = null;
      markId.current = null;
      setClickedMark(false);
      setClickedWord(false);
      console.log("დაემთხვა, შემდეგ", wordsWithMarks);

      setPoint(point + 1);
      setTries(tries + 1);
    } else {
      if (isSecond) {
        setTries(tries + 1);
      } else {
        setIsSecond(true);
      }
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
      <div className="next_game">
        {marks.length === 0 ? (
          <button onClick={() => setPartOfGame(4)}>შემდეგი ეტაპი</button>
        ) : null}
      </div>
    </div>
  );
}

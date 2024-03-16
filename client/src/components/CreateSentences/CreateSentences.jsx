import { useEffect, useMemo, useRef, useState } from "react";
import { getShuffled } from "../../getData";
import "./CreateSentences.scss"

export default function CreateSentences(props) {
  const {
    point,
    setPoint,
    tries,
    setTries,
    wordsForCards,
    setPartOfGame,
    wordsFromSentences,
    sentencesData
  } = props;
  // console.log(props);
  // const cardsData = props.cardsData;
  const sentences = props.sentencesData;
  // console.log(props, cardsData);
  // const [sentenceToFill, setClickedSentence] = useState(0);
  const [clickedWordPlace, setClickedWordPlace] = useState("s0w0");
  const [clickedWord, setClickedWord] = useState(false);
  const [wordReturned, setWordReturned] = useState(false);
  const [clickedWordToReturnId, setClickedWordToReturnId] = useState();
  const [changed, setChanged] = useState(0);
  const [sentenceToFill, setSentenceToFill] = useState(0);

  const chosenPlaceHolder = useRef();
  const wordToReturn = useRef();
  const chosenSentenceState = useRef([false, false, false, false]);
  const chosenPlaceHolderId = useRef([0, 0, 0, 0]);
  const wordToReturnId = useRef();
  const isCorrect = useRef(1);
  const fullOrFill = useRef([
    "to_fill_sentence",
    "to_fill_sentence",
    "to_fill_sentence",
    "to_fill_sentence",
  ]);
  const sentenceToGo = useRef(4);
  // console.log(sentences);

  const words = sentencesData[sentenceToFill].words;

  const wordsForCS = useMemo(() => {
    console.log("useMemo", sentences);
    return sentencesData.map((sentence, index) => {
      const words = sentence.words;
      return sentence.tWords.split("@").map((tWord, index) => ({
        word: words[index],
        tWord,
        isBack: false,
        sentenceIndex: index,
      }));
    });
  }, []);

  const shuffledSentencesData = useMemo(() => {
    return getShuffled(sentencesData);
  }, []);
  const shuffledDataForCS = useMemo(() => {
    return getShuffled(wordsFromSentences);
  }, []);

  useEffect(() => {
    if (
      chosenPlaceHolderId.current[sentenceToFill] <
      wordsForCS[sentenceToFill].length
    ) {
      // console.log(
      //   wordsForCS[sentenceToFill][chosenPlaceHolderId.current[sentenceToFill]]
      //     .word
      // );
      chosenPlaceHolder.current =
        sentencesData[0][
          chosenPlaceHolderId.current[sentenceToFill]
        ].word;
    }
  }, [sentenceToFill]);
  console.log(shuffledSentencesData,shuffledDataForCS)
  return (
    <div className="words_and_sentences">
      <div className="sentences">
        <div className="">
          <div className="to_translate">
            {shuffledSentencesData[0].translation}
          </div>
          <div className="build_here">
            {shuffledSentencesData[0].words.map((word, index) => (
              <div
                className={
                  wordsForCS[sentenceToFill][index].isBack
                    ? "word_returned"
                    : // : clickedSentence === sentenceIndex &&
                      //   chosenPlaceHolderId.current[clickedSentence] ===
                      //     localIndex
                      // ? "word_for_sentence clicked_word_for_sentence"
                      "word_for_sentence"
                }
              >
                {wordsForCS[sentenceToFill][index].isBack ? word : "დოშ"}
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              // console.log("daeWira")
              //   "fill",
              //   sentenceToFill,
              //   wordsForCS.length,
              //   chosenPlaceHolderId.current[sentenceToFill]
              // );
              if (
                sentenceToFill < wordsForCS.length - 1 &&
                words.length == chosenPlaceHolderId.current[sentenceToFill]
              ) {
                // console.log("მოიმატა");
                setSentenceToFill(sentenceToFill + 1);
              } else if (
                sentenceToFill === wordsForCS.length - 1 &&
                wordsForCS.length == chosenPlaceHolderId.current[sentenceToFill]
              ) {
                setPartOfGame(3);
              }
            }}
          >
            {sentenceToFill < wordsForCS.length - 1
              ? "შემდეგი"
              : "შემდეგი ეტაპი  "}
          </button>
        </div>
      </div>
      <div className="words_for_sentence">
        {shuffledDataForCS.map((word, index) => (
          <div
            className={
              clickedWord === index
                ? "card_to_choose clicked_card_to_choose"
                : "card_to_choose"
            }
            onClick={() => {
              wordToReturn.current = word;
              setClickedWord(index);
              wordToReturnId.current = index;
              console.log(wordToReturn,wordToReturnId)
              if (
                chosenPlaceHolderId.current[sentenceToFill] <
                wordsForCS[sentenceToFill].length
              ) {
                chosenPlaceHolder.current =
                  wordsForCS[sentenceToFill][
                    chosenPlaceHolderId.current[sentenceToFill]
                  ].word;
                if (wordToReturn.current === chosenPlaceHolder.current) {
                  isCorrect.current *= 1;
                  wordsForCS[sentenceToFill][
                    chosenPlaceHolderId.current[sentenceToFill]
                  ].isBack = true;
                  chosenPlaceHolderId.current[sentenceToFill]++;
                  shuffledDataForCS.splice(index, 1);
                  setPoint(point + 1);
                  setTries(tries + 1);
                } else {
                  isCorrect.current *= 0;
                  setTries(tries + 1);
                }
              } else {
                chosenPlaceHolder.current = null;
              }
            }}
          >
            <div className="">{word}</div>
          </div>
        ))}
      </div>
      <div className="next_game">
        {sentenceToGo.current === 0 ? (
          // <div className="next">შემდეგი თამაში</div>
          <button onClick={() => setPartOfGame(3)}>შემდეგი ეტაპი</button>
        ) : (
          console.log(
            "არ დასრულებულა"
          )
        )}
      </div>
    </div>
  );
}

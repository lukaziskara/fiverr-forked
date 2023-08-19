import { useEffect, useState } from "react";

const gameDifficulties = [
  {
    isFirstVisible: "first_visible",
    isSecondVisible: "second_visible",
    isThirdVisible: "right_visible",
  },
  {
    isFirstVisible: "first_visible",
    isSecondVisible: "second_waiting",
    isThirdVisible: "third_visible",
  },
  {
    isFirstVisible: "first_visible",
    isSecondVisible: "second_visible",
    isThirdVisible: "third_waiting",
  },
  {
    isFirstVisible: "first_waiting",
    isSecondVisible: "second_waiting",
    isThirdVisible: "third_visible",
  },
  {
    isFirstVisible: "first_visible",
    isSecondVisible: "second_invisible",
    isThirdVisible: "third_visible",
  },
  {
    isFirstVisible: "first_waiting",
    isSecondVisible: "second_invisible",
    isThirdVisible: "third_visible",
  },
  {
    isFirstVisible: "first_visible",
    isSecondVisible: "second_invisible",
    isThirdVisible: "third_waiting",
  },
];

export default function Settings(props) {
  const {
    newGame,
    setNewGame,
    setPoint,
    setTries,
    setPartOfGame,
    // dictionarySettings,
    setDictionarySettings,
  } = props;
  const [chosenDifficulty, setChosenDifficulty] = useState(1);
  const [firstPartState, setFirstPartState] = useState(
    gameDifficulties[0].isFirstVisible
  );
  const [secondPartState, setSecondPartState] = useState(
    gameDifficulties[0].isSecondVisible
  );
  const [thirdPartState, setThirdPartState] = useState(
    gameDifficulties[0].isThirdVisible
  );
  const [sentencesFirstState, setSentencesFirstState] =
    useState(firstPartState);
  const [sentencesSecondState, setSentencesSecondState] =
    useState(secondPartState);
  const [sentencesThirdState, setSentencesThirdState] =
    useState(thirdPartState);

  // console.log("rerender");
  // useEffect(() => {}, [setChosenDifficulty]);

  return (
    <div className="settings">
      <h3>აირჩიე სირთულე</h3>
      <div className="flex_center select_difficulty">
        {gameDifficulties.map((gameDifficulty, index) => (
          // console.log(gameDifficulty);

          <div
            className={chosenDifficulty === index + 1 ? "dItem cItem" : "dItem"}
            onClick={() => {
              // console.log(gameDifficulty, index);
              // setNewGame();
              setChosenDifficulty(index + 1);
              setFirstPartState(gameDifficulty.isFirstVisible);
              setSecondPartState(gameDifficulty.isSecondVisible);
              setThirdPartState(gameDifficulty.isThirdVisible);
              setSentencesFirstState(gameDifficulty.isFirstVisible);
              setSentencesSecondState(gameDifficulty.isSecondVisible);
              setSentencesThirdState(gameDifficulty.isThirdVisible);
            }}
          >
            {index < 4 ? "მარტივი" : "რთული"}
            {/* {index + 1} */}
          </div>
        ))}
      </div>
      <div className="examples">
        <div className="">
          <div className="card left_card">
            <div className={firstPartState}>სიტყვა</div>
            <div className={secondPartState}>დოშ</div>
          </div>
        </div>
        <div className="">
          <div className="card right_card">
            <div className={thirdPartState}>დოშ</div>
          </div>
        </div>
      </div>
      <button
        className="start_button"
        onClick={() => {
          setPoint(0);
          setTries(0);
          setPartOfGame(1);
          setNewGame(newGame + 1);
          setDictionarySettings({
            firstPartState: firstPartState,
            secondPartState: secondPartState,
            thirdPartState: thirdPartState,
          });
        }}
      >
        დაწყება
      </button>
    </div>
  );
}

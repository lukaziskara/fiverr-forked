import { useState } from "react";
import "./Keyboard.scss";
import Keyboard from "react-simple-keyboard";

export default function KeyboardWrapper(props) {
  const { setLetter } = props;
  // console.log(setLetter);
  const letters = [
    "ჲ",
    "ჴ",
    "ჵ",
    "ჸ",
    "ჼ",
    "ₔ",
    "ჰࣿ",
    "έ",
    "ჳ",
    "ჺ",
    "ჶ",
    "ჹ",
    "ჱ",
    "ჷ",
    "¸",
  ];
  const [chosenCardIndex, setChosenCardIndex] = useState(null);

  return (
    <div className="keyboard">
      <div className="letters">
        {letters.map((letter, index) => (
          <div
            className="letter"
            onClick={() => {
              setLetter(letter);
              setChosenCardIndex(index);
            }}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
}

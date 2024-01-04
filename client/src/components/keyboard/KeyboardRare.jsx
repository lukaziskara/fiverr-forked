import { useState } from "react";
import "./Keyboard.scss";
import Keyboard from "react-simple-keyboard";

export default function KeyboardWrapper(props) {
  const { setLetter } = props;
  // console.log(setLetter);
  const letters = [
    {
      theLetter: "a",
      modify: [
        { desc: "მოკლე", hex: "0306" },
        { desc: "ზემოკლე", hex: "0302" },
        { desc: "გრძელი", hex: "0304" },
        { desc: "ზეგრძელი", hex: "0305" },
        { desc: "ნაზალური", hex: "10FC" },
        { desc: "გრძელი&ნაზალური", hex: "0304\u10FC" },
        { desc: "თავისუფალი", hex: "2322" },
        { desc: "თავისუფალი&ნაზალური", hex: "2322\u10FC" },
      ],
    },
    {
      theLetter: "e",
      modify: [
        { desc: "მოკლე", hex: "0306" },
        { desc: "ზემოკლე", hex: "0302" },
        { desc: "გრძელი", hex: "0304" },
        { desc: "ნაზალური", hex: "10FC" },
        { desc: "გრძელი&ნაზალური", hex: "0304\u10FC" },
        { desc: "თავისუფალი", hex: "2322" },
        // { desc: "ზეგრძელი", hex: "0302" },
        // { desc: "თავისუფალი&ნაზალური", hex: "0302" },
        // { desc: "თავისუფალი&გრძელი", hex: "0302" },
        // { desc: "ინტენსიურიური", hex: "10FC" },
        // { desc: "ინტენსიურიური", hex: "10FC" },
        // { desc: "ლატერალური", hex: "10FC" },
        // { desc: "მჟღერი", hex: "10FC" },
      ],
    },
    {
      theLetter: "i",
      modify: [
        { desc: "მოკლე", hex: "0306" },
        { desc: "ზემოკლე", hex: "0302" },
        { desc: "გრძელი", hex: "0304" },
        { desc: "ნაზალური", hex: "10FC" },
        { desc: "გრძელი&ნაზალური", hex: "0304\u10FC" },
        { desc: "თავისუფალი", hex: "2322" },
      ],
    },
    {
      theLetter: "o",
      modify: [
        { desc: "მოკლე", hex: "0306" },
        { desc: "ზემოკლე", hex: "0302" },
        { desc: "გრძელი", hex: "0304" },
        { desc: "ნაზალური", hex: "10FC" },
        { desc: "გრძელი&ნაზალური", hex: "0304\u10FC" },
        { desc: "თავისუფალი", hex: "2322" },
      ],
    },
    {
      theLetter: "u",
      modify: [
        { desc: "მოკლე", hex: "0306" },
        { desc: "ზემოკლე", hex: "0302" },
        { desc: "გრძელი", hex: "0304" },
        { desc: "ნაზალური", hex: "10FC" },
        { desc: "გრძელი&ნაზალური", hex: "0304\u10FC" },
        { desc: "თავისუფალი", hex: "2322" },
      ],
    },
    {
      theLetter: "ჲ",
      modify: [
        { desc: "მოკლე", hex: "0306" },
        { desc: "ზემოკლე", hex: "0302" },
        { desc: "გრძელი", hex: "0304" },
        { desc: "ნაზალური", hex: "10FC" },
        { desc: "გრძელი&ნაზალური", hex: "0304\u10FC" },
        { desc: "თავისუფალი", hex: "2322" },
      ],
    },
    // { theLetter: "ჲ", modify: [1, 2, 3, 4, 5, 6] },
    // { theLetter: "ჴ", modify: [1, 2, 3, 4, 5, 6] },
    // { theLetter: "ჸ", modify: [1, 2, 3, 4, 5, 6] },
    // { theLetter: "ჼ", modify: [1, 2, 3, 4, 5, 6] },
    // { theLetter: "ₔ", modify: [1, 2, 3, 4, 5, 6] },
    {
      theLetter: "ჰ",
      modify: [{ desc: "მჟღერი ჰ", hex: "0304" }, 5, 6],
    },
    // { theLetter: "έ", modify: [1, 2, 3, 4, 5, 6] },
    // { theLetter: "ჳ", modify: [1, 2, 3, 4, 5, 6] },
    // { theLetter: "ჺ", modify: [1, 2, 3, 4, 5, 6] },
    // { theLetter: "ჶ", modify: [1, 2, 3, 4, 5, 6] },
    // { theLetter: "ჹ", modify: [1, 2, 3, 4, 5, 6] },
    // { theLetter: "ჱ", modify: [1, 2, 3, 4, 5, 6] },
    // { theLetter: "ჷ", modify: [1, 2, 3, 4, 5, 6] },
    // { theLetter: "¸", modify: [1, 2, 3, 4, 5, 6] },
  ];
  const [chosenCardIndex, setChosenCardIndex] = useState(null);
  const testLetter = "\u0304";
  console.log(testLetter);

  return (
    <div className="keyboard">
      ა a{testLetter}
      <div className="letters">
        {letters.map((letter, index) => (
          <div
            className="letter"
            onClick={() => {
              setLetter(letter.theLetter);
              setChosenCardIndex(index);
            }}
          >
            {letter.theLetter}
            {/* {letter.modify?<div>adwa</div>} */}
            {/* // {if(letter.modify!=false)modify.map((modifier)=>{return ({letter.theLetter}<span className="modifier">{testLetter}</span>)})} */}
          </div>
        ))}
      </div>
    </div>
  );
}

import "./TheWord.scss";

export default function TheWord(props) {
  const testWord = "და̄ჟარ"
  console.log(props.theWord, testWord.length);
  return (
    <div className="">
      <div className="text">
        {Array.from(testWord).map((letter) => (
          <div className="">
            {letter}
          </div>
        ))}
      </div>
      <div className="">
        <h1>Test Unicode Character</h1>
        <div id="characterContainer" class="character-container">
          ა<span className="macron">̄</span>
        </div>
      </div>
    </div>
  );
}

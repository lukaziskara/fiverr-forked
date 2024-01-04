import { useState } from "react";

export default function Results(props) {
  const [rate, setRate] = useState(5);
  const { sentences, point, tries } = props;
  console.log(rate,Math.round(point / tries*10),Math.round(point / tries*10+Number(rate)));
  return (
    <div className="">
      <h1>
        შედეგი: {point}/{tries} = {Math.round((point / tries) * 100)}%
      </h1>
      {/* <div className="">
        <div className="">
          <p>Please select your age:</p>
          <input type="radio" id="age1" name="age" value="1" onChange={e=>setRate(e.target.value)} />
          <label for="age1">1</label>
          <input type="radio" id="age2" name="age" value="2" onChange={e=>setRate(e.target.value)} />
          <label for="age2">2</label>
          <input type="radio" id="age3" name="age" value="3" onChange={e=>setRate(e.target.value)} />
          <label for="age3">3</label>
          <input type="radio" id="age3" name="age" value="4" onChange={e=>setRate(e.target.value)} />
          <label for="age3">4</label>
          <input type="radio" id="age3" name="age" value="5" onChange={e=>setRate(e.target.value)} />
          <label for="age3">5</label>
        </div>
      </div>
      <h2>შედეგი შეფასებით: {Math.round(point / tries*10 + Number(rate))}</h2> */}
      <div className="result_sentences">
        {sentences.map((sentence, index) => (
          <div className="results_sentence">
            <div className="results_translation">{sentence.translation}</div>
            <div className="results_native">{sentence.sentence}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

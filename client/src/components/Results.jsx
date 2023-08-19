export default function Results(props) {
  const { sentences, point, tries } = props;
  console.log(props);
  return (
    <div className="">
      <h1>
        შედეგი: {point}/{tries} = {Math.round((point / tries) * 100)}%
      </h1>
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

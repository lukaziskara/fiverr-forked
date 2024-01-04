import { Link, useParams } from "react-router-dom";
import "./Video.scss";
import transcripts from "../../scriptsData/videoTranscripts.json";
import { useRef, useState, useMemo } from "react";
import Game from "../../components/Game";
import TimePicker from "react-time-picker";
// import TimeInterval from "../../components/timeInterval/TimeInterval";
export default function Video(props) {
  const [timeInterval, setTimeInterval] = useState();
  const [startTime, setStatrTime] = useState();
  const [endTime, setEndTime] = useState();
  //   const { title, videoUrl, id } = props.item;
  const [isStarted, setIsStarted] = useState(false);
  const [click, setClick] = useState(0);
  const { id } = useParams();
  const inputRef = useRef();
  let wordsForGame = useMemo(() => {});
  const videoData = transcripts.find((el) => el.id == id);
  const { title, words, videoUrl } = videoData;
  console.log(videoData, transcripts, words);
  function clickHandler(index) {
    if (words[index].selected) {
      words[index].selected = false;
    } else {
      words[index].selected = true;
    }
    setClick(click + 1);
  }
  function setup() {
    wordsForGame = words.filter((word) => word.selected);
    console.log(wordsForGame, "hgcfhvnh");
  }
  // console.log(wordsForGame);
  // console.log(timeInterval, inputRef);
  function handleSubmit(e) {
    console.log(inputRef.current.value);
    setTimeInterval(inputRef.current.value);
  }
  return (
    <div className="video">
      <div className="">{videoData.title}</div>;
      <div className="sets">
        <div className="langar">
          <div className="time-choose">
            <div>
              {/* <label for="appt">Select starting time:</label> */}
              <input
                ref={inputRef}
                // value={timeInterval}
                // onChange={(e) => setTimeInterval(e.target.value)}
              />
              {/* <label for="appt">Select ending time:</label>
              <input value={endTime} /> */}
              <input
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              />
            </div>
            {/* <TimeInterval /> */}
          </div>
          <div className="words">
            {words.map((word, index) => (
              <div
                className={word.selected ? "word selected" : "word"}
                onClick={() => {
                  clickHandler(index);
                }}
              >
                <div className="">{word.theWord}</div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            setIsStarted(!isStarted);
            setup();
          }}
        >
          დაწყება
        </button>
        {isStarted ? <Game wordsForGame={wordsForGame} /> : null}
      </div>
      <div className="video-palyer">{videoUrl}</div>
      <div className="lexicon">
        {words.map((word, index) => (
          <div
            className={word.selected ? "word selected" : "word"}
            onClick={() => {
              clickHandler(index);
            }}
          >
            <div className="">
              {word.theWord}-{word.wTranslation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

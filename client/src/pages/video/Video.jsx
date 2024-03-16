import { useEffect, useMemo, useRef, useState } from "react";
import "./Video.scss";
// import YoutubeTranscript from "youtube-transcript";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Game from "../../components/Game";
import TheWord from "../../components/theWord/TheWord";

export default function Video() {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [click, setClick] = useState(0);
  const [newGame, setNewGame] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gameData, setGameData] = useState();

  const inputRef = useRef();

  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    refetchOnWindowFocus: false,
    queryFn: () =>
      newRequest.get(`/videodatas/single/${id}`).then((res) => { //
        return { ...res.data };
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        // console.log(res);
        return res.data;
      }),
    enabled: !!userId,
  });
  // console.log(data, isLoading);
  function clickHandler(index) {
    // console.log("test", wordsToChoose[index], click, index);
    if (wordsToChoose[index].selected) {
      // console.log("wordsToChoose[index], ", click, index);
      wordsToChoose[index].selected = false;
    } else {
      // console.log("false", wordsToChoose[index], click, index);
      wordsToChoose[index].selected = true;
    }
    // console.log("test2", wordsToChoose[index], click, index);

    setClick(click + 1);
    // console.log(wordsToChoose[index], click, index);
  }
  function handleSubmit() {
    const timeInterval = inputRef.current.value;
    console.log(inputRef.current.value);
    setStartTime(timeToSeconds(timeInterval.split("-")[0]));
    setEndTime(timeToSeconds(timeInterval.split("-")[1]));
  }
  function timeToSeconds(time) {
    const arr = time.split(":");
    let seconds = 0;
    for (let i = 0; i < arr.length; i++) {
      const power = arr.length - i - 1;
      seconds += Number(arr[i]) * 60 ** power;
    }
    return seconds;
  }
  if (!isLoading && !isLoaded) {
    setEndTime(300);
    setIsLoaded(true);
  }

  const wordsToChoose = useMemo(() => {
    // console.log(startTime, endTime);
    if (!isLoading && isLoaded) {
      const lines = data.desc;
      // console.log(lines, startTime, endTime);
      const choicedLines = lines.filter(
        (line) => startTime <= line.time && line.time < endTime
      );
      // console.log(choicedLines, "choicedLines");
      const wordsTemp = choicedLines
        .map((line) =>
          line.line
            .toLowerCase()
            .replace(",", "")
            .replace(".", "")
            .replace('"', "")
            .replace('"', "")
            .replace("(", "")
            .replace(")", "")
            .replace(":", "")
            .replace("?", "")
            .split(" ")
        )
        .flat()
        .filter((value, index, self) => self.indexOf(value) === index);
      return wordsTemp.map((word) => ({
        theWord: word,
      }));
    } else {
      return [];
    }
  }, [startTime, endTime]);
  console.log(newGame, isStarted);
  // console.log(wordsToChoose.length, endTime, isLoading, isLoaded);
  useEffect(() => {
    console.log("useEffect run");
    if (isStarted) {
      const wordsToTranslate = wordsToChoose
        .filter((word) => word.selected)
        .map((word) => word.theWord);
      console.log("started", isStarted, wordsToTranslate);
      const lang = "en"

      // newRequest.get(`/words/get?wordsToTranslate=${wordsToTranslate}`)
      newRequest
        .get(`/words`, {
          params: {
            wordsToTranslate,
            lang,
          },
        })
        .then((res) => {
          console.log("დაბრუნდა", res);
          setGameData(res.data);
          // return { ...res.data };
        });

      // newRequest.post("/words", wordsToTranslate);
      // .then((res) => {
      //   return { ...res.data };
      // });
    }
  }, [newGame]);
  console.log("gameData", gameData, isStarted);
  return (
    <div className="video">
      {isLoading && !isLoaded ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="">
          <div className="">
            <h1>{data.title}</h1>
          </div>
          <div className="sets">
            <div className="langar">
              <div className="choose-panel">
                <div className="time-choose">
                  <input
                    defaultValue="00:00:00-00:05:00"
                    className="input-interval"
                    ref={inputRef}
                  />
                  <input
                    type="submit"
                    className="input-interval"
                    onClick={() => {
                      handleSubmit();
                    }}
                  />
                </div>
                <div className="">{wordsToChoose.length} სიტყვა</div>
              </div>
              <div className="words">
                {wordsToChoose.map((word, index) => (
                  <div
                    className={word.selected ? "word selected" : "word"}
                    onClick={() => {
                      clickHandler(index);
                    }}
                  >
                    <div className="">{word.theWord}</div>
                    {/* <div className=""><TheWord theWord={word.theWord} /></div> */}
                  </div>
                ))}
              </div>
              <div className="start-button">
                <button
                  onClick={() => {
                    if (!isStarted) setNewGame(newGame + 1);
                    setIsStarted(!isStarted);
                  }}
                >
                  {isStarted ? "თამაშის გატანა" : "თამაშის გამოტანა"}
                </button>
              </div>
            </div>
            {/* {gameData[0].SYNONYMS.toString(" ")} */}
            {isStarted ? <Game wordsForGame={gameData} /> : null}
          </div>
          <div className="video-palyer">
            {/* <iframe
              // width="1600"
              // height="900"
              // src={videoUrl}
              // src="https://www.youtube.com/embed/zOBzNmM9ylw"
              // title='#12 Walter Block   -  Author of "Defending The Undefendable", Loyola University Professor'
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullScreen="true"
            ></iframe> */}
          </div>
          {/* <input
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          /> */}
          {/* <div className="">
            {searchedWords.map((searchedWord) => (
              <div className="">
                {searchedWord.theWord}-{searchedWord.wTranslation}
              </div>
            ))}
          </div> */}
          
        </div>
      )}
    </div>
  );
}


//       <div className="video-palyer">
//         {/* <video controls="true"> */}
//         {/* <YouTube src="ZG9F22nBKFY13Pfk" /> */}
//         {/* <video controls>
//           <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.720p.vp9.webm" type="video/webm" />
//         </video> */}
//         <iframe
//           // width="1600"
//           // height="900"
//           src={videoUrl}
//           // src="https://www.youtube.com/embed/zOBzNmM9ylw"
//           // title='#12 Walter Block   -  Author of "Defending The Undefendable", Loyola University Professor'
//           frameborder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           allowfullscreen="true"
//         ></iframe>
//         {/* <iframe
//           width="560"
//           height="315"
//           src="https://recorder.google.com/f29b6aef-bf8b-40e8-80f6-45cd03d39453"
//           title="test"
//           frameborder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           allowfullscreen="true"
//         ></iframe> */}
//         {/* <iframe
//           // width="560"
//           // height="315"
//           src="https://www.youtube.com/embed/videoseries?si=hRrftixHfF7WjGEx&amp;list=PLQZmtHjTgPB9w4ZGPhDZ--CaCEMGv4rAb"
//           title="YouTube video player"
//           frameborder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           allowfullscreen="true"
//         ></iframe> */}
//         {/* <source src={videoUrl} type="video/mp4" /> */}
//         {/* </video> */}
//       </div>
//       <input
//         value={searchWord}
//         onChange={(e) => setSearchWord(e.target.value)}
//       />
//       <div className="">
//         {searchedWords.map((searchedWord) => (
//           <div className="">
//             {searchedWord.theWord}-{searchedWord.wTranslation}
//           </div>
//         ))}
//       </div>
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Sentences.scss";
import SentenceCard from "../../components/sentenceCard/SentenceCard";
import GameSentences from "../../components/gameSentences/GameSentences";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Sentences() {
  // const [sort, setSort] = useState("sales");
  // const [open, setOpen] = useState(false);
  const [gameData, setGameData] = useState({});
  const [newGame, setNewGame] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [gameDataCollected, setGameDataCollected] = useState(false);

  const amountRef = useRef();
  const withPicsRef = useRef();
  const methodRef = useRef();
  const themesRef = useRef();
  const themes = useMemo(() => {
    return [
      { name: "ცხოველები", isChecked: "true" },
      { name: "სხეულის ნაწილები", isChecked: "true" },
      { name: "სხვადასხვა", isChecked: "true" },
      { name: "ცხოველები", isChecked: "true" },
    ];
  });

  // const maxRef = useRef();
  // ფუნქცია, რომელიც მიიღებს წინადადებების მონაცემების მასივს და
  // დააბრუნებს იქიდან შემთხვევითად არჩეულ მითითებული რაოდენობის ელემენტებს

  // const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["sentences"],
    refetchOnWindowFocus: false,
    queryFn: () =>
      newRequest
        .get(
          // `/gigs`
          `/sentences`
        )
        .then((res) => {
          return res.data;
        }),
  });
  // console.log("some render");
  function handleSubmit() {
    // console.log(data, "submit",isStarted,newGame);
    if (!isStarted) {
      setNewGame(newGame + 1);
    } else {
      setGameDataCollected(false);
    }
    setIsStarted(!isStarted);
    // console.log(data, "submit",isStarted,newGame);
  }

  function pickSentences(data, NoS, NoP, method, themes) {
    const sentencesWithPicture = data.filter((sentence) => sentence.picture);
    const sentencesWithOutPicture = data.filter(
      (sentence) => !sentence.picture
    );
    // console.log(NoP, sentencesWithPicture, sentencesWithOutPicture);
    // console.log(data, NoS, method);
    const chosenSentences = [];
    // სურათიანი წინადადებების არჩევა
    for (let i = 0; i < NoP; i++) {
      chosenSentences.push(
        sentencesWithPicture.splice(
          Math.floor(Math.random() * sentencesWithPicture.length),
          1
        )[0]
      );
    }
    // სურათის გარეშე წინადადებების არჩევა
    for (let i = 0; i < NoS - NoP; i++) {
      chosenSentences.push(
        sentencesWithOutPicture.splice(
          Math.floor(Math.random() * sentencesWithOutPicture.length),
          1
        )[0]
      );
    }
    return chosenSentences;
  }

  function splitText(data) {
    const words = data
      .map((el) =>
        el.sentence
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
      .flat();
    return words;
  }
  useEffect(() => {
    if (isStarted) {
      const chosenSentences = pickSentences(
        data,
        amountRef.current.value,
        withPicsRef.current.value,
        methodRef.current.value
      );
      const wordsToTranslate = splitText(chosenSentences).filter(
        (value, index, self) => self.indexOf(value) === index
      );
      const lang = "ba";
      newRequest
        .get(`/words`, {
          params: {
            wordsToTranslate,
            lang,
          },
        })
        .then((res) => {
          // console.log("დაბრუნდა", res);
          setGameData({
            wordsFromLexicon: res.data,
            chosenSentences: chosenSentences,
            wordsFromSentences: wordsToTranslate,
          });
          setGameDataCollected(true);
        });
    }
  }, [newGame]);

  // console.log("gameData", gameData, isStarted);
  return (
    <div className="sentences">
      <div className="container">
        <div className="start-button">
          <div className="choose-sentences flex">
            <div className="">
              <label>წინადადებების რაოდენობა</label>
              <input
                ref={amountRef}
                type="number"
                placeholder="amount"
                defaultValue="4"
              />
            </div>
            <div className="">
              <label>სურათებიანების რაოდენობა</label>
              <input
                ref={withPicsRef}
                type="number"
                placeholder="withPics"
                defaultValue="1"
              />
            </div>
            <div className="">
              <input ref={methodRef} type="string" placeholder="method" />
              <label for="cars">Choosing method:</label>
              <select id="cars" name="carlist" form="carform" ref={methodRef}>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div className="">
              <button
                onClick={() => {
                  handleSubmit();
                  // if (!isStarted) setNewGame(newGame + 1);
                  // setIsStarted(!isStarted);
                }}
              >
                {isStarted ? "თამაშის გატანა" : "თამაშის გამოტანა"}
              </button>
            </div>
            {/* <input
          type="submit"
          className="input-interval"
          onClick={() => {
            handleSubmit();
          }}
        /> */}
          </div>
          {/* <GameInput /> */}
        </div>
        {/* <GameInput /> */}
        {gameDataCollected ? <GameSentences gameData={gameData} /> : null}
        <div className="cards">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.map((gig) => <SentenceCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Sentences;

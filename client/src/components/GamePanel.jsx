export default function GamePanel(props) {
  const { point, setPoint, tries, setTries, partOfGame, setPartOfGame } = props;
  return (
    <div className="topic-div">
      <div className="result">
        <div className="point">
          {point}
          <div className="qula">ქულა</div>
        </div>
        /
        <div className="tries">
          {tries}
          <div className="cda">ცდა</div>
        </div>
      </div>
      <div className="game_part_buttons">
        <button
          className={partOfGame === 0 ? "opened_game" : ""}
          onClick={() => {
            setPartOfGame(0);
          }}
        >
          S
        </button>
        <button
          className={partOfGame === 1 ? "opened_game" : ""}
          onClick={() => {
            setPartOfGame(1);
            setPoint(0);
            setTries(0);
          }}
        >
          I
        </button>
        <button
          className={partOfGame === 2 ? "opened_game" : "closed_game"}
          onClick={() => {
            setPartOfGame(2);
            setPoint(0);
            setTries(0);
          }}
        >
          II
        </button>
        <button
          className={partOfGame === 3 ? "opened_game" : "closed_game"}
          onClick={() => {
            setPartOfGame(3);
            setPoint(0);
            setTries(0);
          }}
        >
          III
        </button>
        <button
          className={partOfGame === 4 ? "opened_game" : "closed_game"}
          onClick={() => {
            setPartOfGame(4);
            setPoint(0);
            setTries(0);
          }}
        >
          IV
        </button>
        <button
          className={partOfGame === 5 ? "opened_game" : "closed_game"}
          onClick={() => {
            setPartOfGame(5);
            setPoint(0);
            setTries(0);
          }}
        >
          V
        </button>
        <button
          className={partOfGame === 6 ? "opened_game" : "closed_game"}
          onClick={() => {
            setPartOfGame(0);
            setPoint(0);
            setTries(0);
          }}
        >
          R
        </button>
      </div>
    </div>
  );
}

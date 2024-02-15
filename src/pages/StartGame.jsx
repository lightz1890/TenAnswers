/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Header, Heart, QuestionMark, InputSection, ResultPopup } from "../components/GameComponents"
import { WhiteBtn,ModeBox } from "../components/Components";
import { useEffect, useRef, useState } from "react";

const StartGame = (props) => {
  
  let { gameMode } = props;
  let [hp, setHp] = useState(gameMode == "easy" ? 10 : 5);
  let [round,setRound] = useState(1)
  let [lowest,setLowest] = useState(0)
  let [highest,setHighest] = useState(99)
  let [ans,setAns] = useState(() => { return Math.floor(Math.random() * 100)})
  let [playerStatus, setPlayerStatus] = useState(null);
  
  const [popupVisible, setPopupVisible] = useState(false);
  // console.log(popupVisible)

  const togglePopup = () => {
    setPopupVisible(!popupVisible); // Toggle True/False || True:Visible & False:Hidden
  };

  

  // console.log('round : ',round,'ans : ',ans)

  // console.log("HP : ", hp, " | mode: ", gameMode);


  return (
    <>
      <ResultPopup visible={popupVisible} playerStatus={playerStatus} ans={ans}></ResultPopup>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ModeBox
          height="741px"
          text="Guess between 0-99"
          className="mode-box-body"
        >
          <Heart
            hp={hp}
            hintText={
              gameMode == "easy"
                ? `Hint : It's between ${lowest} - ${highest}`
                : ""
            }
          />
          <QuestionMark answer={ans} />
          <InputSection
            hp={hp}
            setHp={setHp}
            lowest={lowest}
            setLowest={setLowest}
            highest={highest}
            setHighest={setHighest}
            ans={ans}
            round={round}
            setRound={setRound}
            togglePopup={togglePopup}
            setPlayerStatus={setPlayerStatus}
          ></InputSection>
        </ModeBox>
      </div>
    </>
  );
}

export default StartGame
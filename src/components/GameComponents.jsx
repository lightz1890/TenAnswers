/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./GameComponents.css";
import homeIcon from "../assets/home-icon-silhouette.png";
import restartIcon from "../assets/restart.png"
import { Link } from "react-router-dom";
import { useEffect, useRef} from "react";
import heartIcon from "../assets/heart.png";
import { WhiteBtn } from "./Components";
import downArrow from "../assets/down-arrow (1).png"
import upArrow from "../assets/up-arrow.png"

export function Header() {

  return (
    <div className="header">
      <Link to={'/'}>
        <PurpleBtn text="Home" icon={homeIcon}></PurpleBtn>
      </Link>
        <PurpleBtn text="Restart" icon={restartIcon} do='reload'></PurpleBtn>
    </div>
  );
}

export function PurpleBtn(props) {
  return (
    <div className="PurpleBtn" onClick={props.do == 'reload' ? () => {
      window.location.reload()
    } : null}>
      <h2>{props.text}</h2>
      <img className="iconStyle" src={props.icon} alt="img" />
    </div>
  );
}


export function Heart(props) {
  
  let hpContainer = useRef()
  let { hp } = props;
  // console.log("hp startup :",hp)

    const updateHearts = () => {
      // console.log("updateHearts Activate | Hp :",hp)
      hpContainer.current.innerHTML = "";
      for (let i = 0; i < hp; i++) {
        const hpIcon = `<img className='iconStyle' src=${heartIcon} alt="hp" />`;
        if (hpContainer.current) {
          hpContainer.current.innerHTML += hpIcon;
        }
      }
    };
    
    useEffect(() => {
      // console.log("useEffect execute ( hp : ",hp," )")
      // console.log('useEffect')
      updateHearts();
    }, [hp]);
    

  return (
    <div className="heart">
      <div className="hp-section" ref={hpContainer}>

      </div>
      <div className="hint">
        <h5 id="hintText">{props.hintText}</h5>
      </div>
    </div>
  );
}

export function QuestionMark(props) {
  return (
    <div className="question-mark">
      <span style={{ fontSize: "55px" }}>
        {/* {props.answer} */}
        ?
      </span>
    </div>
  );
}


export function InputSection(props) {
  let inputValue = useRef(null);
  let displayLog = useRef();

  const playerWin = () => {
    props.togglePopup();
  }
  const playerLose = () => {
    props.togglePopup();
  }


  const AddLog = (round, playerInput, text, picSrc) => {
    const logElement = document.createElement("div"); // Create a new log element
    logElement.className = "log"; // Set the class name

    const roundElement = document.createElement("div");
    roundElement.className = "round";
    const roundText = document.createElement("h5");
    roundText.textContent = round;
    roundElement.appendChild(roundText);

    const detailLogElement = document.createElement("div");
    detailLogElement.className = "detail-log";
    const detailLogText = document.createElement("h5");
    detailLogText.textContent = `You Answer : ${playerInput} | ${text}`;
    const iconElement = document.createElement("img");
    iconElement.className = "icon";
    iconElement.src = `${picSrc}`;
    detailLogElement.appendChild(detailLogText);
    detailLogElement.appendChild(iconElement);

    logElement.appendChild(roundElement);
    logElement.appendChild(detailLogElement);

    displayLog.current.appendChild(logElement);
  };

  const RemoveHp = () => {
    // console.log("hp before click remove : ",hp)
    if (props.hp > 0) {
      props.setHp(props.hp - 1);
    }
    // console.log("hp after click remove : ",hp)
  };
  const getInput = () => {
    if (inputValue.current.value < 0 || inputValue.current.value > 99) {
      console.log("Enter number between 0 - 99 only!");
    } else if (inputValue.current.value.includes(" ")) {
      console.log("value contain space!");
    } else if (inputValue.current.value == "") {
      console.log("type something");
    } else if (isNaN(inputValue.current.value)) {
      console.log("type only number");
    } else if (/^0\d/.test(inputValue.current.value.trim())) {
      console.log("Value should not start with 0");
    } else if (/\./.test(inputValue.current.value.trim())) {
      console.log("Value should not contain decimal points");
    } else {
      let playerInput = inputValue.current.value;
      // console.log("you good to go!");
      // console.log("playerInput :" + playerInput);
      if (
        Number(playerInput) > Number(props.lowest) &&
        Number(playerInput) < Number(props.ans)
      ) {
        props.setLowest(playerInput);
      } else if (
        Number(playerInput) < Number(props.highest) &&
        Number(playerInput) > Number(props.ans)
      ) {
        props.setHighest(playerInput);
      }
      if (playerInput > props.ans) {
        AddLog(props.round, playerInput, "Guess Lower!", downArrow);
      } else if (playerInput < props.ans) {
        AddLog(props.round, playerInput, "Guess Higher!", upArrow);
      } else if (playerInput == props.ans) {
        // hintText.innerText = `You Win!`; //temp
        props.setPlayerStatus(true);
        playerWin();
        return 0;
      }
      if (props.hp == 1) {
        // hintText.innerText = `You Lose!`; //temp
        props.setPlayerStatus(false);
        playerLose();
      }
      props.setRound(props.round + 1);
      RemoveHp();
      displayLog.current.scrollTop = displayLog.current.scrollHeight;
    }
    inputValue.current.value = "";
  };

  return (
    <>
      <div className="display-log">
        <div className="content" ref={displayLog}></div>
      </div>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter Number"
          className="input-bar"
          ref={inputValue}
        ></input>
        <WhiteBtn do="addLog" text="Enter" getInput={getInput}></WhiteBtn>
      </div>
    </>
  );
}


export function ResultPopup(props) {
  let cheerText = useRef()
  let overlayText = useRef()
  let { visible,playerStatus } = props
  // console.log("playerStatus : ", playerStatus)
  useEffect(() => {
     if (cheerText.current && overlayText.current) {
       if (playerStatus) {
         cheerText.current.innerText = "Great Work";
         overlayText.current.innerText = "You Guess Correctly!";
       } else {
         cheerText.current.innerText = "Unfortunately";
         overlayText.current.innerText = "You Lose The Game!";
       }
     }
  }, [playerStatus]);

  return (
    <div className={visible ? "popup-visible" : "popup-hidden"}>
      <div className="overlay">
        <div
          className={
            playerStatus ? "overlay-header-win" : "overlay-header-lose"
          }
        >
          <h3>Answer</h3>
        </div>
        <div className="overlay-body">
          <div className="overlay-answer">
            <span className={playerStatus ? "answer-win" : "answer-lose"}>
              {props.ans}
            </span>
          </div>
          <div className="overlay-text">
            <h2
              style={{ fontSize: "24px", color: "black" }}
              ref={cheerText}
            ></h2>
            <h1
              style={{ fontSize: "32px"}}
              className={
                playerStatus ? "overlay-text-win" : "overlay-text-lose"
              }
              ref={overlayText}
            ></h1>
          </div>
          <div className="overlay-nav">
            <div className="shadow">
              <WhiteBtn width='136px' height='41px' text='Play again?' do='restart'/>
            </div>
            <div className="shadow2">
              <Link to={'/'}>
                <WhiteBtn width='136px' height='41px' text='Home'/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

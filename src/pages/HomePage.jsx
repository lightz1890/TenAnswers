import { useState } from "react";
import {
  PopUp,
  WhiteBtn,
  Title,
  ModeBox,
  ModeBtn,
  Additional,
  AboutBtn,
} from "../components/Components";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!popupVisible); // Toggle True/False || True:Visible & False:Hidden
  };

  return (
    <>
      <PopUp visible={popupVisible}>
        <WhiteBtn togglePopup={togglePopup} do='openPopup' text="Close"></WhiteBtn>
      </PopUp>
      <Title gameName1="Guess It" gameName2="TenAnswers"></Title>
      <ModeBox
        height="346px"
        text="Select a mode"
        className="mode-box-body-home"
      >
        <Link to={"/easy"}>
          <ModeBtn difClass="mode-button-easy" difficulty="Easy"></ModeBtn>
        </Link>
        <Link to={"/normal"}>
          <ModeBtn difClass="mode-button-normal" difficulty="Normal"></ModeBtn>
        </Link>
      </ModeBox>
      <Additional madeBy="Pitchaya Piyakrit Kittipat">
        <AboutBtn togglePopup={togglePopup}></AboutBtn>
      </Additional>
    </>
  );
};

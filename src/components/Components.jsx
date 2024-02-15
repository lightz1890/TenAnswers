/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './Components.css'
import questionMark from '../assets/question-mark.png'


    
export function PopUp(props) {
  const { children, visible } = props;

  return (
    <div className={visible ? 'popup-visible' : 'popup-hidden'}>
      <div className="overlay">
        <div className="overlay-header">
          <h2 style={{fontSize:'30px'}}>How to play?</h2>
        </div>
        <div className="overlay-body" style={{backgroundColor: '#6f59c8'}}>
          <p style={{marginLeft:'15px'}}>&nbsp;&nbsp;&nbsp; The &quot;Ten Answer&quot; is a simple yet
          engaging number guessing game
          where the player has to <span style={{ color: '#FDDF5F' }}>guess</span> a randomly
          generated number between 1 and 100
          within determined attempts.</p>
          <div className="buttom-part">
            <h1>What is the different in difficulty?</h1>
            <p>&nbsp;&nbsp;&nbsp; In <span style={{ color: '#2c9947' }}>EASY</span> 
            You will have 10 chances to guess and be able to see <span style={{ color: '#FDDF5F' }}>HINT</span>.</p>
            <p>&nbsp;&nbsp;&nbsp; In <span style={{ color: '#D73E2C' }}>HARD</span> You will have 5 chances to
            guess and not be able to see the <span style={{ color: '#FDDF5F' }}>HINT</span>.</p>
          </div>
          <div className="close-section">
            { children }
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhiteBtn(props) {
  const handleClick = () => {
    // console.log("toggle popup")
    if (props.do == "openPopup") {
      props.togglePopup();
    } else if (props.do == "addLog") {
      props.getInput();
    } else if (props.do == 'restart') {
      // props.setPlayer(null)
      console.log('restartGame')
      window.location.reload()
    }
  };

  return (
    <div
      className="white-button"
      onClick={handleClick}
      style={{ width: `${props.width}`, height: `${props.height}` }}
    >
      <h3 style={{ color: "black" }}>{props.text}</h3>
    </div>
  );
}

export function ModeBtn(props) {
  return (
    <div className={props.difClass}>
      <h2 style={{fontSize:'30px'}}>{props.difficulty}</h2>
    </div>
    );
}

export function ModeBox(props) {
  const { children } = props
  return (
    <div className="mode">
        <div className="mode-box" style={{height:props.height}}>
          <div className="mode-box-header">
            <h2>{props.text}</h2>
          </div>
          <div className={props.className}>
            {children}
          </div>
        </div>
      </div>
  );
}

export function Title(props) {
  return (
      <div className="title">
        <h1 className="title-text">{props.gameName1}</h1>
        <h4>{props.gameName2}</h4>
      </div>
  );
}

export function Additional(props) {
  let { children } = props
  return (
    <div className="additional">
      <div className="made-by">
        <h3>made by</h3>
        <h4>{props.madeBy}</h4>
      </div>
      { children }
    </div>
  );
}

export function AboutBtn(props) {
  const handleClick = () => {
    props.togglePopup(); // Call the togglePopup function passed as a prop
  };

  return (
    <div className="about-button" onClick={handleClick}>
      <img className="question-mark-img" src={questionMark} alt="?" />
    </div>
  );
}

export function Screen(props) {
  const { children } = props;
  return (
    <div className="screen">
      {children}
    </div>
  );
}

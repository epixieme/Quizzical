import main from "../css/main.css";
export default function Button(props) {
const noOfCorrectAnswers = props.numberCorrect
console.log(noOfCorrectAnswers)
  return (
    <div class ="display-score">
      <p>{props.checked ? `You scored ${noOfCorrectAnswers}/${props.allAnswers} correct Answers` : ""}</p>
      <button className="btn" onClick={props.handleClick}>
        {props.btnText}
      </button>
    </div>
  );
}

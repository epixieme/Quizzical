import main from "../css/main.css";
export default function Button(props) {
const noOfCorrectAnswers = props.numberCorrect
console.log(noOfCorrectAnswers)
  return (
    <div>
      <p>{props.checked ? `You scored ${noOfCorrectAnswers}/${props.allAnswers}` : ""}</p>
      <button className="btn" onClick={props.handleClick}>
        {props.btnText}
      </button>
    </div>
  );
}

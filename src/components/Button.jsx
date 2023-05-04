import main from "../css/main.css";
export default function Button(props) {
  return (
    <div>
      <p>{props.checked ? "You scored xxxx" : ""}</p>
      <button className="btn" onClick={props.handleClick}>
        {props.btnText}
      </button>
    </div>
  );
}

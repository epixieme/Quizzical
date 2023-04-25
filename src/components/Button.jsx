import main from "../css/main.css"
export default function Button(props){

  return (
        <div >
            <button className='btn' onClick = {props.handleClick}>{props.btnText}</button>
        </div>
    )
}
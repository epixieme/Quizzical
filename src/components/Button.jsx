export default function Button(props){
    return (
        <div>
            <button onClick = {props.handleClick} >{props.btnText}</button>
        </div>
    )
}
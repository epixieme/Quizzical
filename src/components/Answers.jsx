export default function Answers(props){


    // const styles = {
    //     backgroundColor: props.isHeld ? "#59E391" : "white"
    // }
const answers  = props.answer.map(item=>{
    return (<section  className="answer-container">
    <p onClick={props.handleClick}>{item}</p>
    </section>)
})
return(
  
     
       <section>
        {answers}
       </section>
    
        
    )
}
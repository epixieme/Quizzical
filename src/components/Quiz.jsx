export default function Quiz(props){

    const incorrectAnswers  = props.incorrectAnswer.map(item=>{
        return <section  className="answer-container">
        <p onClick={props.handleClick}>{item}</p>
        </section>
    })

   
   
return(
       <section >
       <p>{props.question}</p>
       <section>
       {incorrectAnswers}
       <section className="answer-container">
       <p>{props.correctAnswer}</p>
       </section>
       </section>
   
      </section>
      
        
    )
}
export default function Quiz(props){
    
const combinedAnswers = [...props.incorrectAnswer, props.correctAnswer]
    const answers = combinedAnswers.map(answer=>{
        return (
        <section  className="answer-container">
        <p onClick={props.handleClick}>{answer}</p>
        </section>
        )
    })

   /// onlick answer - see tenzies game 
   
return(
       <section>
       <p>{props.question}</p>
       <section className="answers-outer-container">
       {answers}
       </section>
     
   
      </section>
      
        
    )
}
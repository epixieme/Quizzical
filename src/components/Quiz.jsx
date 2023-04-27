export default function Quiz(props){


    const answers = props.allAnswers.map(answer=>{
       
        return (
        <section  className="answer-container">
        <p onClick={()=>props.handleClick(answer)}>{answer}</p>
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
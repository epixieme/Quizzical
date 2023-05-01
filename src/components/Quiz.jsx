export default function Quiz(props){


const answers = props.allAnswers.map(answer=>{
    // console.log(answer.id)
        return (
                <section  className="answer-container" key={answer.id}>
                <p key={answer.id} onClick={()=>props.handleClick(answer.answer, answer.id, props.mainid)}>{answer.answer}</p>
                </section>
                )
    
})


return(
       <section key={props.id}>
       <p key={props.id}>{props.question}</p>
       <section className="answers-outer-container" key={props.id}>
       {answers}
       </section>
     
   
      </section>
      
        
    )
}
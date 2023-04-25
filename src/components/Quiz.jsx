import Button from './Button'
export default function Quiz(props){


return(
       <section>
       <p>{props.question}</p>
       <p onClick={props.handleClick}>{props.answer}</p>
      </section>
        
    )
}
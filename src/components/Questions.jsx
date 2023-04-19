export default function Questions(props){

    const question = props.question
    return(
        <div>
            <pre>{JSON.stringify(question, null, 2)}</pre>
            <h1>hello</h1>
        </div>
    )
}
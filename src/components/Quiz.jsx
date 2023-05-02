export default function Quiz(props) {
  const answers = props.allAnswers.map((answer) => {
    //     // console.log(answer.id) how do I get this to work on click rather than straigt off
    const styles = {
      border: answer.isSelected ? "1px solid green" : "none",
      backgroundColor:
        answer.answer === answer.correctAnswer && props.isChecked
          ? "green"
          : answer.isSelected && answer.isCorrect && props.isChecked
          ? "green"
          : answer.isSelected && !answer.isCorrect && props.isChecked
          ? "red"
          : "none",
    };
    return (
      <section className="answer-container" key={answer.id} style={styles}>
        <p
          key={answer.id}
          onClick={() =>
            props.handleClick(answer.answer, answer.id, props.mainid)
          }
        >
          {answer.answer}
        </p>
      </section>
    );
  });

  return (
    <section key={props.id}>
      <p key={props.id}>{props.question}</p>
      <section className="answers-outer-container" key={props.id}>
        {answers}
      </section>
    </section>
  );
}

export default function Quiz(props) {
  const answers = props.allAnswers.map((answer) => {
    //     // console.log(answer.id) how do I get this to work on click rather than straigt off
    function answerColors() {
      if (answer.isSelected && !props.isChecked) {
        return "#D6DBF5";
      } else if (!answer.isSelected && !props.isChecked) {
        return "white";
      }

      if (answer.answer === answer.correctAnswer && props.isChecked) {
        return "#94D7A2";
      } else if (answer.isSelected && answer.isCorrect && props.isChecked) {
        return "#94D7A2";
      } else if (answer.isSelected && !answer.isCorrect && props.isChecked) {
        return "#F8BCBC";
      } else {
        return "none";
      }
    }

    const styles = {
      border: answer.isSelected ? "1px solid white" : "#293264 1px solid",
      backgroundColor: answerColors(),
    };
    return (
      <section className={"answer-container"} key={answer.id} style={styles}>
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
    <section className="question-text" key={props.id}>
      <p key={props.id}>{props.question}</p>
      <section className="answers-outer-container " key={props.id}>
        {answers}
      </section>
    </section>
  );
}

import React from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import Quiz from "./components/Quiz";
import Spinner from "./components/Spinner";
import Answers from "./components/Answers";

export default function App() {
  const [start, setStart] = React.useState(false);
  //empty string for the first fetch
  const [quiz, setQuiz] = React.useState("");

  const [questionInfo, setQuestionInfo] = React.useState([]);
  console.log(questionInfo);
  const [answers, setAnswers] = React.useState({
    answers: [],
    isCorrect: false,
  });

  const [loading, setLoading] = React.useState(false);

  const title = "Quizzical";
  const StartBtnText = "Start Here";
  const EndBtnText = "Results";
  const loadingText = "loading...";

  React.useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(quiz);
        const data = await response.json();

        // setquestiondata needs to be made into an object

        setQuestionInfo(
          data.results.map((item) => {
            return {
              question: item.question,
              answers: [...item.incorrect_answers, item.correct_answer],
              isSelected: false,
              isCorrect: false,
              correctAnswer:item.correct_answer,
            };
          })
        );
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    //empty string for the first fetch so it doesn't just keep trying to load the api before the click
    fetchQuestions();
  }, [quiz, start]);

  function startGame() {
    setStart(true);
    setQuiz("https://opentdb.com/api.php?amount=10");
  }

  function chooseAnswer(answer) {
    console.log(answer)

    setQuestionInfo(prev=>prev.map(item=>{
      return answer===item.correctAnswer?{...item, isCorrect:true}:item
    }))
  
  }

  function EndGame() {}

  const getQuiz = questionInfo.map((item) => {
    // const allAnswers = [...item.incorrect_answers, item.correct_answer]

    return (
      <Quiz
        question={item.question}
        handleClick={chooseAnswer}
        allAnswers={item.answers}
      />
    );
  });

  const loadingCondition = loading ? (
    <Spinner loading={loading} isLoading={loadingText} />
  ) : (
    <Button btnText={EndBtnText} handleClick={EndGame} />
  );

  return (
    <main className={loading || !start ? "main" : "questions"}>
      {!start && <Header title={title} />}
      {!start && <Button btnText={StartBtnText} handleClick={startGame} />}
      {start && getQuiz}
      {start && loadingCondition}
    </main>
  );
}

import Header from "./components/Header";
import Button from "./components/Button";
import Quiz from "./components/Quiz";
import React from "react";
export default function App() {
  const [start, setStart] = React.useState(false);
  //empty string for the first fetch
  const [quiz, setQuiz] = React.useState("");
  const [questionData, setQuestionData] = React.useState([]);
  const [answers, setAnswers] = React.useState([])

  const title = "Quizzical";
  const ButtonText = "Start Here";

  React.useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(quiz);
      const data = await response.json();
      // console.log(data.results.map(item=>item.question))
      setQuestionData(data.results);
    };
    //empty string for the first fetch so it doesn't just keep trying to load the api before the click
    fetchQuestions();
  }, [quiz, start]);

  function startGame() {
    setStart(true);
    setQuiz("https://opentdb.com/api.php?amount=10");
    //loading spinner
  }

  // function Answers(){
  //     return questionData.map(item=>[...item.incorrect_answers, item.correct_answer])
  // }

  // console.log('answers', Answers())
  function chooseAnswer(){
console.log('answer')
  }

  const getQuestions = questionData.map((item) => {
 
    return <Quiz question={item.question} answer={[...item.incorrect_answers, item.correct_answer]} handleClick={chooseAnswer} />;
  });





  return (
    <main>
      {!start && <Header title={title} />}
      {!start && <Button btnText={ButtonText} handleClick={startGame} />}
      {start && getQuestions}
    </main>
  );
}

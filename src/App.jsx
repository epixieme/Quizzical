import Header from "./components/Header";
import Button from "./components/Button";
import Quiz from "./components/Quiz";
import Spinner from "./components/Spinner";
import React from "react";

export default function App() {
  const [start, setStart] = React.useState(false);
  //empty string for the first fetch
  const [quiz, setQuiz] = React.useState("");
  const [questionData, setQuestionData] = React.useState([]);
  const [answers, setAnswers] = React.useState([])
  const [loading, setLoading] =React.useState(false)

  const title = "Quizzical";
  const StartBtnText = "Start Here";
  const EndBtnText ="Results"
  const loadingText = "loading..."


  React.useEffect(() => {
    const fetchQuestions = async () => {
  try{
    setLoading(true);
      const response = await fetch(quiz);
      const data = await response.json();
      setQuestionData(data.results);
    } catch(e) {
    console.log(e)
    }
      finally {
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


  function chooseAnswer(){

  }

  function EndGame(){

  }

  const getQuestions = questionData.map((item) => {
    return <Quiz  question={item.question} answer={[...item.incorrect_answers, item.correct_answer]} handleClick={chooseAnswer} />;
  });

  const loadingCondition =  loading? <Spinner loading = {loading} isLoading = {loadingText}/>:start && <Button btnText={EndBtnText} handleClick={EndGame} />


  return (

    <main>
     {!start && <Header title={title} />}
      {!start && <Button btnText={StartBtnText} handleClick={startGame} />}
      {start && getQuestions}
      {start && loadingCondition}
      
   
      
    </main>
    
  );

  
}

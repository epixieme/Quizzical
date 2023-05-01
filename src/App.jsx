import React from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import Quiz from "./components/Quiz";
import Spinner from "./components/Spinner";
import Answers from "./components/Answers";
import { nanoid } from "nanoid";

export default function App() {
  const [start, setStart] = React.useState(false);
  //empty string for the first fetch
  const [quiz, setQuiz] = React.useState("");
  const [questionData, setQuestionData] = React.useState([]);
  const [questionInfo, setQuestionInfo] = React.useState([]);
  // console.log(questionData)

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

        setQuestionData(
          data.results.map((item) => {
            let combinedArray = [
              ...item.incorrect_answers,
              item.correct_answer,
            ];
            return {
              question: item.question,
              id: nanoid(),
              allAnswers: [...item.incorrect_answers, item.correct_answer].map(
                (ele) => {
                  return {
                    answer: ele,
                    isSelected: false,
                    isCorrect: false,
                    correctAnswer: item.correct_answer, // fixed by changing map from item to ele
                    id: nanoid(),
                  };
                }
              ),
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

  function chooseAnswer(selectedAnswer, answerid, mainid) {
    // change all of this to use id so its unique.

    setQuestionData((prev) => {
      return prev.map((ele) => {
       
        if (mainid === ele.id) {
          return {
            ...ele,

            allAnswers: ele.allAnswers.map((item) => {
            
              if (answerid === item.id) {
                return {
                  ...item,
                  isSelected: true,
               
                };
              } else {
                return {
                  ...item,
                  isSelected: false,
              
                };
              }
             
            }),
      
          };
        } else {
          return {
            ...ele
          };
        }
     
      });
      
    });
 
  }

  function correctAnswer(){


  const selected = questionData.flatMap(item=>item.allAnswers.filter(ele=>ele.isSelected === true))
  const selectedAnswers = selected.map(item=>item.answer === item.correctAnswer)
  
// display result 
//change button to new game
//reset everything

  console.log('selected',selected)
  console.log('answer',selectedAnswers)
  } /// fix this logic

  function EndGame() {}

  const getQuiz = questionData.map((item) => {
    return (
      <Quiz
        question={item.question}
        handleClick={chooseAnswer}
        allAnswers={item.allAnswers}
        key={item.id}
        answerid={item.allAnswers.map((ele) => ele.id)}
        mainid={item.id}
      />
    );
  });

  const loadingCondition = loading ? (
    <Spinner loading={loading} isLoading={loadingText} />
  ) : (
    <Button btnText={EndBtnText} handleClick={correctAnswer} />
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

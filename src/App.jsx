import React from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import Quiz from "./components/Quiz";
import Spinner from "./components/Spinner";
import GameOptions from "./components/GameOptions";
import { nanoid } from "nanoid";

export default function App() {
  const [start, setStart] = React.useState(false);
  //empty string for the first fetch
  const [quiz, setQuiz] = React.useState("https://opentdb.com/api.php?amount=10");
  const [questionData, setQuestionData] = React.useState([]);

  // console.log(questionData);

  const [loading, setLoading] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const [formData, setformData] = React.useState({
    category:""
  });

  const title = "Quizzical";
  const StartBtnText = "Start Here";
  const CheckResult = "Check Answers";
  const PlayAgain = "Play Again";
  const loadingText = "loading...";

  React.useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(quiz);
        const data = await response.json();


        setQuestionData(
          data.results.map((item) => {
            return {
              category:item.category,
              difficulty:item.difficulty,
              question: item.question.replace(/&[#A-Za-z0-9]+;/gi, ""),
              id: nanoid(),
              allAnswers: [...item.incorrect_answers, item.correct_answer].map(
                (ele) => {
                  return {
                    answer: ele.replace(/&[#A-Za-z0-9]+;/gi, ""),
                    isSelected: false,
                    isCorrect: false,
                    correctAnswer: item.correct_answer.replace(
                      /&[#A-Za-z0-9]+;/gi,
                      ""
                    ), // fixed by changing map from item to ele
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

  function handleChange(event) {
    console.log(event)
    const {name, value} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: value
        }
    })
}



// console.log(gameCategory)

  function startGame() {
    setStart(true);
    // setQuiz("https://opentdb.com/api.php?amount=10");


    // https://opentdb.com/api.php?amount=10&category=11&difficulty=medium
  }

  function chooseAnswer(selectedAnswer, answerid, mainid) {
    // change all of this to use id so its unique.

    setQuestionData((prev) => {
      return prev.map((ele) => {
        // this picks the correct question otherwise it will look at the answers across all questions and only pick one answer for the whole thing rather than within each answer array
        if (mainid === ele.id) {
          return {
            ...ele,

            allAnswers: ele.allAnswers.map((item) => {
              if (answerid === item.id) {
                return {
                  ...item,
                  isSelected: true,
                  isCorrect: selectedAnswer === item.correctAnswer, // this equates to true
                };
              } else {
                return {
                  ...item,
                  isSelected: false,
                  isCorrect: false,
                };
              }
            }),
          };
        } else {
          return {
            ...ele,
          };
        }
      });
    });
  }

  function correctAnswer() {

   const selectedAnswers = questionData.flatMap(item=>item.allAnswers.filter(ele=>ele.isSelected))
    
      if(selectedAnswers.length === 10){
        setCheck(true);
      }else{
        alert("Please Ensure all questions are answered before submission")
      }

  
  }

  function playAgain() {
    setStart(false);
    setCheck(false);

  }

  const getQuiz = questionData.map((item) => {
    //work out how to update the if correct then
    return (
      <Quiz
        question={item.question}
        handleClick={chooseAnswer}
        allAnswers={item.allAnswers}
        key={item.id}
        answerid={item.allAnswers.map((ele) => ele.id)}
        mainid={item.id}
        isChecked={check}
      />
    );
  });

  const numberCorrect = questionData.flatMap((item) =>
    item.allAnswers.filter((ele) => ele.isCorrect)
  ).length;

  const allAnswers = questionData.length;
  // console.log(allAnswers);

  const loadingCondition = loading ? (
    <Spinner loading={loading} isLoading={loadingText} />
  ) : (
    <section className="button-alignment">
      <Button
        btnText={check ? PlayAgain : CheckResult}
        handleClick={check ? playAgain : correctAnswer}
        checked={check}
        numberCorrect={numberCorrect}
        allAnswers={allAnswers}
      />
    </section>
  );

  return (
    <main className={loading || !start ? "main" : "questions"}>
      
      {!start && <Header title={title} />}
      {!start && <GameOptions category={questionData.map(item=>item.category)} difficulty={questionData.map(item=>item.difficulty)}onChange={handleChange}/>}
      {!start && <Button btnText={StartBtnText} handleClick={startGame} />}
      {start && getQuiz}
      {start && loadingCondition}
    </main>
  );
}

/// work out how to reset and clear the data

import React from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import Quiz from "./components/Quiz";
import Spinner from "./components/Spinner";
import { nanoid } from "nanoid";

export default function App() {
  const [start, setStart] = React.useState(false);
  //empty string for the first fetch
  const [quiz, setQuiz] = React.useState("");
  const [questionData, setQuestionData] = React.useState([]);

  console.log(questionData);

  const [loading, setLoading] = React.useState(false);
  const [check, setCheck] = React.useState(false);

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

        // setquestiondata needs to be made into an object

        setQuestionData(
          data.results.map((item) => {
            return {
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

  function startGame() {
    setStart(true);
    setQuiz("https://opentdb.com/api.php?amount=10");
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
    //if isSelected < 10 then message please select all else  setchecked true
    // const allSelected = questionData.map(item=>item.allAnswers.every(item.isSelected))
    // if(allSelected){
      if(selectedAnswers.length === 10){
        setCheck(true);
      }else{
        console.log("please select from all of the answers")
      }

    // }
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
  console.log(allAnswers);

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
      {!start && <Button btnText={StartBtnText} handleClick={startGame} />}
      {start && getQuiz}
      {start && loadingCondition}
    </main>
  );
}

/// work out how to reset and clear the data

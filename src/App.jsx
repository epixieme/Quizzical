import React from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import Quiz from "./components/Quiz";
import Spinner from "./components/Spinner";
import GameOptions from "./components/GameOptions";
import { nanoid } from "nanoid";
import yellowBlob from "../src/assets/images/yellowblob.svg";
import blueBlob from "../src/assets/images/blueblob.svg";

export default function App() {
  const [start, setStart] = React.useState(false);
  //empty string for the first fetch
  const [quiz, setQuiz] = React.useState("");
  const [quizChoice, setQuizChoice] = React.useState([]);
  const [questionData, setQuestionData] = React.useState([]);
  const [categoryData, setCategoryData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const [formData, setFormData] = React.useState({
    category: "",
    difficulty: "",
  });
console.log(questionData)
  const title = "Quizzical";
  const StartBtnText = "Start Here";
  const CheckResult = "Check Answers";
  const PlayAgain = "Play Again";
  const loadingText = "loading...";

  React.useEffect(() => {
    const fetchQuestions = async (item) => {
      try {

        setLoading(true);

        function generateCategoryId() {
          let id = "";
          for (let i = 0; i < categoryData.length; i++) {
            if (categoryData[i].name === formData.category)
              id = categoryData[i].id;
          }
          return id;
        }

        const [quizResponse, categoriesResponse, quizChoiceResponse] =
          await Promise.all([
            fetch("https://opentdb.com/api.php?amount=10"),
            fetch("https://opentdb.com/api_category.php"),
            fetch(
              `https://opentdb.com/api.php?amount=10&category=${generateCategoryId()}&difficulty=${
                formData.difficulty
              }`
            ),
          ]);

        const quiz = await quizResponse.json();
        const categories = await categoriesResponse.json();
        const quizChoice = await quizChoiceResponse.json();

        setCategoryData(
          categories.trivia_categories.map((item) => {
            return {
              id: item.id,
              name: item.name,
            };
          })
        );

        const url = !start ? quiz : quizChoice;
      
        setQuestionData(
          url.results.map((item) => {
            
            const answers =  [...item.incorrect_answers, item.correct_answer].sort(() => 0.5 - Math.random())

            return {
              difficulty: item.difficulty,
              question: item.question.replace(/&[#A-Za-z0-9]+;/gi, ""),
              id: nanoid(),
              allAnswers: answers.map(
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

    fetchQuestions();
  }, [quiz, quizChoice, start]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function startGame() {
    setStart(true);
  }
  function chooseAnswer(selectedAnswer, answerid, mainid) {
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
                  isCorrect: selectedAnswer === item.correctAnswer, 
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

  const allAnswers = questionData.length;

  function correctAnswer() {

    const selectedAnswers = questionData.flatMap((item) =>
      item.allAnswers.filter((ele) => ele.isSelected)
    );

    if (selectedAnswers.length === 10) {
      setCheck(true);
     
      
    } else {
      alert("Please Ensure all questions are answered before submission");
    }
  }

  const numberCorrect = questionData.flatMap((item) =>
    item.allAnswers.filter((ele) => ele.isCorrect)
  ).length;

  function playAgain() {
    setStart(false);
    setCheck(false);
    setFormData({ category: "", difficulty: "" });
  }

  const getQuiz = questionData.map((item) => {
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

  function mainScreen() {
    if (!start && !loading) {
      return (
        <>
          <img
            className="yellow-blob-intro"
            src={yellowBlob}
            alt="Yellow Blob"
            width="500px"
          />
          ;
          <Header title={title} />
          <GameOptions
            category={categoryData.map((item) => item.name)}
            difficulty={[
              ...new Set(questionData.map((item) => item.difficulty)),
            ]}
            onChange={handleChange}
            catValue={formData.category}
            diffValue={formData.difficulty}
          />
          <Button btnText={StartBtnText} handleClick={startGame} />
          <img
            className="blue-blob-intro"
            src={blueBlob}
            alt="blue Blob"
            width="500px"
          />
        </>
      );
    } else if (loading) {
      return (
        <section class="spinner-position">
          <Spinner loading={loading} isLoading={loadingText} />
        </section>
      );
    } else {
      return (
        <>
          {getQuiz}
          <section className="button-alignment">
            <Button
              btnText={check ? PlayAgain : CheckResult}
              handleClick={check ? playAgain : correctAnswer}
              checked={check}
              numberCorrect={numberCorrect}
              allAnswers={allAnswers}
            />
          </section>
        </>
      );
    }
  }

  return <main className={!start ? "main" : "questions"}>{mainScreen()}</main>;
}

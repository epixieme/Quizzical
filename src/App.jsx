import Header from "./components/Header"
import Button from "./components/Button"
import Questions from "./components/Questions"
import React from 'react'
export default function App() {

const [start, setStart] = React.useState(false)
//empty string for the first fetch
const [fetchData, setFetchData]=React.useState([])
const [questions, setQuestions] =React.useState({})
console.log(fetchData)
const title = "Quizzical"
const ButtonText = "Start Here"

React.useEffect(()=>{
//empty string for the first fetch
fetchQuestions()
},[fetchData, start])

const fetchQuestions = async () => {
  const response = await fetch(fetchData);
    const data = await response.json();
 
    setFetchData(data.results.map(elem => (
  {
   category: elem.category,
  
  } 
)))}
  

  function startGame(){
    setFetchData("https://opentdb.com/api.php?amount=10")
    setStart(true)
  }


return (
<main>

{!start  && <Header title = {title}/>}
{!start &&  <Button btnText = {ButtonText} handleClick = {startGame}/>}
{start && <Questions question={fetchData} />}

</main>
);
}



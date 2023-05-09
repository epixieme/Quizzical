export default function GameOptions(props){
const categoryOptions = props.category.map((item,index)=> <option key = {index} value={item}>{item}</option>)
const difficultyOptions = props.difficulty.map((item,index)=> <option key = {index} value={item}>{item}</option>)

    
return(
    <form action="" className="form-controls">
    <select onChange={props.onChange}
     name="category"
     id="category"
     value={props.category}
    >
    {categoryOptions}
    
    </select>
    <select name="" id="">
    {difficultyOptions}
    </select>
    </form>
)
}
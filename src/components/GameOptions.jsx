export default function GameOptions(props){
const options = props.category.map((item,index)=> <option key = {index} value={item}>{item}</option>)
    
return(
    <form action="">
    <select onChange={props.onChange}
     name="category"
     id="category"
     value={props.category}
    >
    {options}
    </select>
    </form>
)
}
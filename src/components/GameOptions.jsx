export default function GameOptions(props) {
  const categoryOptions = props.category.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));


  const levels = [{difficulty:'easy', index:0},{difficulty:'medium', index:1},{ difficulty:'hard', index:2}];
  const sorted = props.difficulty.sort((a, b) => levels.indexOf(b.difficulty) - levels.indexOf(a.difficulty));

  const difficultyOptions = sorted.map((item, index) => (
    // sort easy medium hard or use destucturing 
    <option key={index} value={item}>
      {item[0].toUpperCase()+ item.slice(1)}
    </option>
  ));

  return (
    <form action="" className="form-controls">
      <select
        onChange={props.onChange}
        name="category"
        id="category"
        value={props.catValue}
        className="dropdown-control"
      >
       <option value="" disabled="disabled" selected >Choose Category</option>
        {categoryOptions}
      </select>
      <select 
        onChange={props.onChange}
        name="difficulty"
        id="difficulty"
        value={props.diffValue}
        className="dropdown-control"
      >
        <option value="" disabled="disabled" selected >Choose Difficulty</option>
        {difficultyOptions}
      </select>
    </form>
  );
}

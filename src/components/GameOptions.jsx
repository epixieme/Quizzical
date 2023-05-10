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
      {item}
    </option>
  ));

  return (
    <form action="" className="form-controls">
      <select
        onChange={props.onChange}
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
  );
}

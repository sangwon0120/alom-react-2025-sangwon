import { useState ,useEffect} from "react";
import './ToDo.css';

function App() {
  // 과제1-1: 7-1, 7-2강을 듣고 이곳에 투두리스트 컴포넌트를 작성해주세요.
  const [toDo, setToDo] =useState("");
  const [toDos, setToDos] = useState(()=>{
    const savedTodos = localStorage.getItem('toDos');
    return savedTodos ?  JSON.parse(savedTodos) : [];
  });
  const onDelete = (indexToDelete) => {
  const afterDeleteToDos = toDos.filter((_, index) => index !== indexToDelete);
  setToDos(afterDeleteToDos);
};

  useEffect(()=>{
    localStorage.setItem('toDos',JSON.stringify(toDos));
  },[toDos]);

  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if(toDo===""){
      return;
    }
    setToDo("");
    setToDos(currentArray => [toDo,...currentArray]); 
  };
  return (
    <div className="container">
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit} className="form">
        <input 
          onChange ={onChange} 
          value = {toDo} 
          type="text" 
          placeholder="Wirte your to do..."
          className="input"
        />
        <button className="add-button">Add To Do</button>
      </form>
      <hr />
      <ul className="todo-list">
        {toDos.map((item,index) => 
            <li className="todo-item"
            key={index}>
                {item}
                <button className="delete-button" onClick={() => onDelete(index)}>❌</button>
            </li>
        )}
      </ul>
    </div>
  );
}

export default App;
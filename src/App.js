import React, { useState } from 'react';
import './App.css';
import Todotable from './components/Todolist';

function App() {
  const [todo, setTodo] = useState({desc: '', date: ''});
  const [todos, setTodos] = useState([]);

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value });
  }

  const handleDelete = (index) => {
    const deletedTodo = [...todos].filter((todo, i) => i !== index)

    setTodos(deletedTodo);
  }


 
  return (
    <div className="App" >
      <div className="top">
        <h1>Simple todolist</h1>
      </div>
      <div className="div1">
        <h2>Add todo</h2>
        <form onSubmit={addTodo}>
          <label>Description: </label>
          <input type="text" name="desc" value={todo.desc} onChange={inputChanged}  />
          <label>Date: </label>
          <input type="date" name="date" value={todo.date} onChange={inputChanged}  />
          <input type="submit" value="Add" />
        </form>
        <Todotable todos={todos} handleDelete={handleDelete}/>
      </div>
 
    </div>
  );
}

export default App;

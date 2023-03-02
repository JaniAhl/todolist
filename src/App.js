import React, { useRef, useState } from 'react';
import './App.css';
import Todotable from './components/Todolist';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-material.css';


function App() {
  const [todo, setTodo] = useState({desc: '', date: '', priority:''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value });
  }

  /* const handleDelete = (index) => {
    const deletedTodo = [...todos].filter((todo, i) => i !== index)

    setTodos(deletedTodo);
  }
  */

  const columns = [
    { field: "description", sortable: true, filter: true },
    { field: "date", sortable: true, filter: true },
    { field: "priority", sortable: true, filter: true,
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} }
    ]

    const deleteTodo = () => {
      if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) =>
      index !== gridRef.current.getSelectedNodes()[0].childIndex))
      }
      else {
      alert('Select row first');
      }
      }
      
    


 
  return (
    <div className="App">
      <input type="date" name="date" value={todo.date} onChange={inputChanged} />
      <input type="text" name="desc" value={todo.desc} onChange={inputChanged} />
      <input type="text" name="priority" value={todo.priority} onChange={inputChanged} />
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>

    <div className="ag-theme-material"
    style={{height: '700px', width: '80%', margin: 'auto'}} >
      <AgGridReact
        ref={gridRef}
        onGridReady={ params => gridRef.current = params.api }
        rowSelection="single"
        columnDefs={columns}
        rowData={todos}>
      </AgGridReact>
    </div>
    </div>


   /* <div className="App" >
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
 
    </div> */
  );
}

export default App;

import React, { useRef, useState } from 'react';
import '../App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-material.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Todo() {
  const [todo, setTodo] = useState({desc:'', date: '', priority:''});
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState((new Date().toString()));
  const gridRef = useRef();

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  }

  const dateToString = (newValue) => {
    const newSelectedDate = newValue.toISOString().split('T', 1);
    setSelectedDate(newSelectedDate)
    setTodo({...todo, date: newSelectedDate})
  }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value });
  }

  /* const handleDelete = (index) => {
    const deletedTodo = [...todos].filter((todo, i) => i !== index)

    setTodos(deletedTodo);
  }
  */

  const columns  = [
    { field: "date", sortable: true, filter: true},
    { headerName: "Description", field: "desc", sortable: true, filter: true },
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
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" marginTop="20px">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Date" name="date" value={selectedDate} onChange={dateToString} renderInput={(props) => <TextField {...props} />}/>
      </LocalizationProvider> 
      <TextField label="Description" variant="standard" name="desc" value={todo.desc} onChange={inputChanged} />
      <TextField label="Priority" variant="standard" name="priority" value={todo.priority} onChange={inputChanged} />
      <Button onClick={addTodo} variant="contained">Add</Button>
      <Button onClick={deleteTodo}>Delete</Button>
      </Stack>

    <div className="ag-theme-material"
    style={{height: '700px', width: '40%', margin: 'auto'}} >
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


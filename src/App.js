import './App.css';
import {
  Route,
  Routes,} from 'react-router-dom'

import Login from './Login';
import Signup from './Signup';
import TodoList from './TodoList';
import Task from './Task';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element = {<Login/>} />
        <Route path ='/signup' element = {<Signup/>}/>
        <Route path='/todolist' element = {<TodoList/>}/>
        <Route path='/todolist/item' element = {<Task/>} />
      </Routes>
      
    </div>
  );
}

export default App;

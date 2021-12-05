import React from 'react';
import './App.css';
import AddTodoItem from './components/add-todo.component';
import TodoList from './components/todo-list.component';

function App() {
	return (<>
		<AddTodoItem />
		<TodoList />
	</>);
}

export default App;

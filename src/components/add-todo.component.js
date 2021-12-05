import React from 'react';
import Dexie from 'dexie';

const db = new Dexie('TodoList');
db.version(1).stores({
	todoItems: "++id, todoTitle, todoCategory, todoStatusDone, deadLine"
});

const addItemToDb = async event => {
	event.preventDefault();
	const todoTitle = document.querySelector('.todo-name').value;
	const todoCategory = document.querySelector('.category').value;
	await db.todoItems.add({ todoTitle, todoCategory, todoStatusDone: false, deadLine: null });
	document.querySelector('.todo-name').value = '';
}

export default function AddTodoItem() {
	return (
		<div className="add-item-container">
			<h1>Todo list</h1>
			<form className="add-item-form" onSubmit={event => addItemToDb(event)} >
				<input type="text" className="todo-name" placeholder="What do you need to do?" required />
					<select className="category">
						<option value="General">General</option>
						<option value="Personal">Personal</option>
						<option value="Work">Work</option>
					</select>
				<button type="submit" className="waves-effect waves-light btn right">Add to list</button>
			</form>
		</div>
	);
}
import React from 'react';
import Dexie from 'dexie';
import { useLiveQuery } from "dexie-react-hooks";
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';

const db = new Dexie('TodoList');
db.version(1).stores(
	{ todoItems: "++id, todoTitle, todoCategory, todoStatusDone, deadLine" }
)

export default function TodoList() {
	const allItems = useLiveQuery(() => db.todoItems.toArray(), []);

	const removeItemFromDb = async id => {
		await db.todoItems.delete(id);
	}

	const markAsDone = async (id, currentState) => {
		console.log('click:', id);

		await db.todoItems.update(id, {todoStatusDone: !currentState})
	}

	let todoList = allItems?.map(i =>(
		<li key={i.id}>
			<div className="list-item-box">
				<div className="todo-info">
					<span className="todo-type">{i.todoCategory}</span>
					<span
						className="todo-message"
						style={{textDecoration: i.todoStatusDone ? 'line-through' : 'none'}}
					>
							{i.todoTitle}
					</span>
				</div>
				<div>
					<ToggleButton
						value="check"
						selected={i.todoStatusDone}
						onChange={() => markAsDone(i.id, i.todoStatusDone)}
					>
						<CheckIcon />
					</ToggleButton>
					
					<button onClick={() => removeItemFromDb(i.id)}>Delete</button>
				</div>
			</div>
		</li>
	));

	return (<><ul className="todo-list">{todoList}</ul></>);
}
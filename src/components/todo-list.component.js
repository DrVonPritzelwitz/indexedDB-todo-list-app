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

	const markAsDone = async (id) => {
		console.log('click:', id);
	}

	let todoList = allItems?.map(i =>(
		<li key={i.id}>
			<div className="list-item-box">
				<div className="todo-info">
					<span className="todo-type">{i.todoCategory}</span>
					<span className="todo-message">{i.todoTitle}</span>
				</div>
				<div>
					<ToggleButton
						value="check"
						selected={false}
						onChange={() => markAsDone(i.id)}
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
import React from "react";
import "../App.css";
import { ITask } from "../types";

interface TaskItemProps {
	task: ITask;
	onRemove: (id: number) => void;
	onToggle: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onRemove, onToggle }) => {
	const { id, text, completed } = task;

	const handleRemoveClick = () => {
		onRemove(id);
	};

	const handleCheckboxToggle = () => {
		onToggle(id);
	};

	return (
		<div className="task-item">
			<input className="task-item-checkbox" onInput={handleCheckboxToggle} type="checkbox" />
			<label className="task-item-text" style={completed ? { textDecoration: "line-through" } : {}}>
				{text}
			</label>
			<button className="task-item-remove-button" onClick={handleRemoveClick}>Remove</button>
		</div>
	);
};

export default TaskItem;

import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { ITask } from "../types";
import {
	getItemsFromLocalStorage,
	setItemsToLocalStorage,
} from "../localStorage";

interface TaskListProps {
	tasks?: Array<ITask>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
	const [taskArr, setTaskArr] = useState<ITask[]>([]);
	const [inputState, setInputState] = useState("");

	useEffect(() => {
		const itemsFromLocalStorage = getItemsFromLocalStorage();
		if (itemsFromLocalStorage?.length) {
			setTaskArr(itemsFromLocalStorage);
		} else if (tasks?.length) {
			setTaskArr(tasks);
		}
	}, [tasks]);

	const handleAdd = () => {
		if (inputState) {
			const newTask: ITask = {
				id: new Date().getTime(),
				completed: false,
				text: inputState,
			};
			const newList = [newTask, ...taskArr];
			setTaskArr(newList);
			setItemsToLocalStorage(newList);
			setInputState("");
		}
	};

	const handleRemove = (id: number) => {
		const newTaskList = taskArr.filter((task) => task.id !== id);
		setTaskArr(newTaskList);
		setItemsToLocalStorage(newTaskList);
	};

	const handleToggle = (id: number) => {
		const newTaskList = taskArr.map((task) => {
			if (task?.id === id) {
				return {
					...task,
					completed: !task.completed,
				};
			}
			return task;
		});
		setTaskArr(newTaskList);
	};

	const handleChangeText = (event: React.FormEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		setInputState(value);
	};

	return (
		<div className="task-list">
			<h1 className="task-list-title">Task List</h1>
			<input className="add-task-input" value={inputState} onChange={handleChangeText} />
			<button className="add-task-button" onClick={handleAdd}>Add</button>
			{taskArr?.length === 0 ? (
				<p className="task-list-empty">No tasks to display</p>
			) : (
				<>
					{taskArr?.map((el) => (
						<TaskItem
							key={el.id}
							task={el}
							onRemove={handleRemove}
							onToggle={handleToggle}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default TaskList;

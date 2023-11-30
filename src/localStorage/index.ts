import { ITask } from "../types";

export const getItemsFromLocalStorage = () => {
	const itemsList = localStorage.getItem("tasks");
	return itemsList ? JSON.parse(itemsList) : "";
};

export const setItemsToLocalStorage = (items: ITask[]) => {
	localStorage.setItem("tasks", JSON.stringify(items));
};

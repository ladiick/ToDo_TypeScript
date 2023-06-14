import create, {State, StateCreator} from 'zustand'
import {generateId} from "../helpers";

interface Task {
	id: string;
	title: string;
	createdAt: number;

}

interface ToDoStore {
	tasks: Task[];
	createTask: (title: string) => void;
	updateTask: (id: string, title: string) => void;
	deleteTask: (id: string) => void;
}

const isTodoStore = (object: any): object is ToDoStore=>{
	return 'tasks' in object
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>):
	StateCreator<T> => (set, get, api) =>
	config((nextState,...args) => {
		if (isTodoStore(nextState)) {
			localStorage.setItem('tasks', JSON.stringify(nextState.tasks))
		}
		set(nextState,...args)
	}, get, api)

const getCurrentState = ()=>{
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return (JSON.parse(localStorage.getItem('tasks')) || []) as Task[]
	}
	catch(err){
		return localStorage.setItem('tasks','[]')
	}
	return []
}

export const useToDoStore = create<ToDoStore>(localStorageUpdate((set, get) => ({
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
	tasks: getCurrentState(),
	createTask: (title: string) => {
		const {tasks} = get();
		const newTask = {
			id: generateId(),
			title,
			createdAt: Date.now(),
		}

		set({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			tasks: [newTask].concat(tasks),
		})

	},
	updateTask: (id: string, title: string) => {
		const {tasks} = get();
		set({
			tasks: tasks.map(task => ({
				...task,
				title: task.id === id ? title : task.title
			}))
		})
	},
	deleteTask: (id: string) => {
		const {tasks} = get();
		set({
			tasks: tasks.filter(task => task.id !== id)
		})
	},
})))
import {
	// useCallback,
	// useMemo,
	useState,
	useReducer,
	type SubmitEventHandler,
} from "react";
import Navbar from "./components/Navbar";
import { NavLink, Link, useNavigate } from "react-router";

// import { ThemeContext } from "./App";
// import { useStoreTheme } from "./store/theme";
import axios from "axios";
import type { IRequestData } from "./typings/responseData";
import { PRIORITY_OPTION } from "./consts/priorityOption";
import { STATUS_OPTION } from "./consts/statusOption";
import Button from "./components/Button";

const DEFAULT_VALUE: IRequestData = {
	title: "",
	description: "",
	priority: "low",
	status: "to-do",
};

interface IReducerAction {
	type: "title" | "description" | "priority" | "status";
	data: string;
}

function reducer(state: IRequestData, action: IReducerAction) {
	if (action.type === "title") {
		return {
			...state,
			title: action.data,
		};
	} else if (action.type === "description") {
		return {
			...state,
			description: action.data,
		};
	} else if (action.type === "priority") {
		return {
			...state,
			priority: action.data,
		};
	} else if (action.type === "status") {
		return {
			...state,
			status: action.data,
		};
	} else {
		return state;
	}
}

function Create() {
	const navigation = useNavigate();

	const [loading, setLoading] = useState(false);
	const [data, dispatch] = useReducer(reducer, DEFAULT_VALUE);

	// const [state, setState] = useState();
	// const data = useRef(3000);

	// const storeTheme = useStoreTheme();

	// const example = useCallback(() => {
	// 	console.log();
	// }, [state]);

	// const example2 = useMemo(() => {
	// 	const a = 10;
	// 	const b = 20;
	// 	const result = a + b;
	// 	return result;
	// }, [state]);

	async function postData(data: IRequestData) {
		setLoading(true);
		await axios
			.post("https://6a635d61b30b52361e1a3009.mockapi.io/kanban", data)
			.then(() => {
				console.log("Success create task");
				navigation("/");
			})
			.catch(() => {
				console.log("Failed create data");
			})
			.finally(() => {
				setLoading(false);
			});
	}

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		postData(data);
	};

	return (
		<div>
			<Navbar />
			<div className="container-form">
				<NavLink className="btn-link" to="/">
					Back To Home Page
				</NavLink>
				<h1>Add Task</h1>
				<form onSubmit={handleSubmit} className="form-container">
					<label htmlFor="title">Title</label>
					<input
						id="title"
						type="text"
						placeholder="Masukkan Title"
						onChange={(event) => {
							dispatch({
								type: "title",
								data: event.target.value,
							});
						}}
					/>
					<label htmlFor="description">Description</label>
					<textarea
						id="description"
						placeholder="Masukkan Description"
						onChange={(event) => {
							dispatch({
								type: "description",
								data: event.target.value,
							});
						}}
					/>
					<label htmlFor="priority">Priority</label>
					<select
						id="priority"
						onChange={(event) => {
							dispatch({
								type: "priority",
								data: event.target.value,
							});
						}}
					>
						{PRIORITY_OPTION.map((item) => (
							<option key={item.id} value={item.value}>
								{item.label}
							</option>
						))}
					</select>
					<label htmlFor="status">Status</label>
					<select
						id="status"
						onChange={(event) => {
							dispatch({
								type: "status",
								data: event.target.value,
							});
						}}
					>
						{STATUS_OPTION.map((item) => (
							<option key={item.id} value={item.value}>
								{item.label}
							</option>
						))}
					</select>
					<Button type="submit" disabled={loading}>
						{loading ? "Loading" : "Submit"}
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Create;

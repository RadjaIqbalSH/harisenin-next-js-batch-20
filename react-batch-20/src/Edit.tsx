import {
	useEffect,
	useReducer,
	useState,
	type SubmitEventHandler,
} from "react";
import Navbar from "./components/Navbar";
import { NavLink, useNavigate, useParams } from "react-router";
import axios from "axios";
import type { IRequestData, IResponseData } from "./typings/responseData";
import { STATUS_OPTION } from "./consts/statusOption";
import { PRIORITY_OPTION } from "./consts/priorityOption";
import Button from "./components/Button";

const DEFAULT_VALUE: IRequestData = {
	title: "",
	description: "",
	priority: "low",
	status: "to-do",
};

interface IReducerAction {
	type: "title" | "description" | "priority" | "status" | "all";
	data?: string;
	bulkData?: IResponseData;
}

function reducer(state: IRequestData, action: IReducerAction): IRequestData {
	switch (action.type) {
		case "title":
			return {
				...state,
				title: action.data || "",
			};

		case "description":
			return {
				...state,
				description: action.data || "",
			};

		case "priority":
			return {
				...state,
				priority: action.data || "",
			};

		case "status":
			return {
				...state,
				status: action.data || "",
			};

		case "all":
			return {
				...state,
				title: action.bulkData?.title || "",
				description: action.bulkData?.description || "",
				priority: action.bulkData?.priority || "",
				status: action.bulkData?.status || "",
			};

		default:
			return state;
	}
}

function Edit() {
	const params = useParams();
	const navigation = useNavigate();

	const [state, dispatch] = useReducer(reducer, DEFAULT_VALUE);
	const [loading, setLoading] = useState(false);

	async function getDetailData() {
		setLoading(true);
		await axios
			.get(
				`https://6a635d61b30b52361e1a3009.mockapi.io/kanban/${params.id}`,
			)
			.then((response) => {
				dispatch({
					type: "all",
					bulkData: response.data,
				});
			})
			.catch(() => {})
			.finally(() => {
				setLoading(false);
			});
	}

	useEffect(() => {
		getDetailData();
	}, []);

	async function updateData(data: IRequestData) {
		setLoading(true);
		await axios
			.put(
				`https://6a635d61b30b52361e1a3009.mockapi.io/kanban/${params.id}`,
				data,
			)
			.then(() => {
				console.log("Success edit task");
				navigation("/");
			})
			.catch(() => {
				console.log("Failed edit data");
			})
			.finally(() => {
				setLoading(false);
			});
	}

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		updateData(state);
	};

	return (
		<div>
			<Navbar />
			<div className="container-form">
				<NavLink className="btn-link" to="/">
					Back To Home Page
				</NavLink>
				<h1>Edit Task</h1>
				<form onSubmit={handleSubmit} className="form-container">
					<label htmlFor="title">Title</label>
					<input
						id="title"
						type="text"
						defaultValue={state.title}
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
						defaultValue={state.description}
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
						defaultValue={state.priority}
						onChange={(event) => {
							dispatch({
								type: "priority",
								data: event.target.value,
							});
						}}
					>
						{PRIORITY_OPTION.map((item) => (
							<option
								key={item.id}
								value={item.value}
								selected={item.value === state.priority}
							>
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
							<option
								key={item.id}
								value={item.value}
								selected={item.value === state.status}
							>
								{item.label}
							</option>
						))}
					</select>
					<Button type="submit" disabled={loading}>
						{loading ? "Loading" : "Edit"}
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Edit;

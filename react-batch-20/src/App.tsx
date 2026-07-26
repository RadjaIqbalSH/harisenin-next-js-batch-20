import "./App.css";
import {
	useState,
	createContext,
	useEffect,
	type Dispatch,
	type SetStateAction,
} from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";

import axios from "axios";
import type { IResponseData } from "./typings/responseData";

/**
 * Type data TS
 *
 * string
 * number
 * boolean
 * null
 * undefined
 *
 */

// const exampleDataNumber: number = 10;
// const exampleDataString: string = "string";
// const exampleDataBoolean: boolean = true;

// const exampleDataObject: {
// 	firstName: string;
// 	lastName: string;
// 	age: number;
// } = {
// 	firstName: "Jhon",
// 	lastName: "Doe",
// 	age: 10,
// };

// const exampleDataArrayString: string[] = ["kuda", "gajah", "semut"];
// const exampleDataArrayNumber: number[] = [1, 2, 3];
// const exampleDataArrayNumberAndString: [number, string, number] = [1, "2", 3];

// const exampleDataArrayOfObject: {
// 	firstName: string;
// 	lastName: string;
// }[] = [
// 	{
// 		firstName: "Jhon",
// 		lastName: "Doe",
// 	},
// ];

// interface IExampleDataObjectInterface {
// 	firstName: string;
// 	lastName: string;
// 	age: number;
// 	address: {
// 		city: string;
// 		province: string;
// 		postCode: number;
// 	};
// 	hobby: string[];
// 	information: {
// 		gender: string;
// 		child?: {
// 			name: string;
// 			age: number;
// 			gender: string;
// 			hobby?: string | string[];
// 		}[];
// 	};
// }

// const exampleDataObjectInterface: IExampleDataObjectInterface = {
// 	firstName: "Jhon",
// 	lastName: "Doe",
// 	age: 10,
// 	address: {
// 		city: "Jakarta Selatan",
// 		province: "DKI Jakarta",
// 		postCode: 12505,
// 	},
// 	hobby: ["tenis", "pool", "race"],
// 	information: {
// 		gender: "man",
// 		child: [
// 			{
// 				name: "Anak 1",
// 				age: 10,
// 				gender: "Cowo",
// 				hobby: ["pool", "tenis"],
// 			},
// 			{
// 				name: "Anak 2",
// 				age: 12,
// 				gender: "Cewe",
// 				hobby: "Valorant",
// 			},
// 		],
// 	},
// };

type TTheme = "dark" | "light";

export const ThemeContext = createContext<null | {
	theme: TTheme;
	setTheme: Dispatch<SetStateAction<TTheme>>;
}>(null);

function App() {
	const [theme, setTheme] = useState<TTheme>("dark");
	const [loading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<IResponseData[]>([]);

	async function deleteData(id: string): Promise<void> {
		await axios
			.delete(`https://6a635d61b30b52361e1a3009.mockapi.io/kanban/${id}`)
			.then(async () => {
				await getData();
				// kondisi request api nya success
			})
			.catch(() => {
				// kondisi request api nya error
			})
			.finally(() => {
				// di jalankan setelah salah satu kondisi di atas telah di jalankan
			});
	}

	async function getData(): Promise<void> {
		setLoading(true);
		await axios
			.get<IResponseData[]>(
				"https://6a635d61b30b52361e1a3009.mockapi.io/kanban",
			)
			.then((response) => {
				setData(response.data);
				// kondisi request api nya success
			})
			.catch(() => {
				// kondisi request api nya error
			})
			.finally(() => {
				setLoading(false);
				// di jalankan setelah salah satu kondisi di atas telah di jalankan
			});
	}

	useEffect(() => {
		getData();
	}, []); // code hanya akan di jalankan 1 kali di fase mount pertamaz

	return (
		<ThemeContext
			value={{
				theme: theme,
				setTheme: setTheme,
			}}
		>
			<div>
				<Navbar />
				<div className={`container`}>
					{loading ? (
						<h1>Loading....</h1>
					) : (
						data.map((item) => (
							<Card
								key={item.id}
								id={item.id}
								title={item.title}
								description={item.description}
								priority={item.priority}
								status={item.status}
								handleDelete={deleteData}
							/>
						))
					)}
				</div>
			</div>
		</ThemeContext>
	);
}

export default App;

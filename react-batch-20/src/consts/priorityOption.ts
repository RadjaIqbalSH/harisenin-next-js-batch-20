interface IPriorityOption {
	id: number;
	label: string;
	value: string;
}

export const PRIORITY_OPTION: IPriorityOption[] = [
	{
		id: 1,
		label: "Low",
		value: "low",
	},
	{
		id: 2,
		label: "Medium",
		value: "medium",
	},
	{
		id: 3,
		label: "High",
		value: "high",
	},
];

export interface IResponseData {
	title: string;
	description: string;
	priority: string;
	status: string;
	id: string;
}

export interface IRequestData extends Omit<IResponseData, "id"> {}

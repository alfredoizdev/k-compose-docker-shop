export interface IUser {
	id: string;
	name: string;
	last: string;
	email: string;
	role: "admin" | "user"
}
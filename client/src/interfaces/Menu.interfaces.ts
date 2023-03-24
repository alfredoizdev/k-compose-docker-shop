export interface IMenu {
	title: string;
	href: string;
	role: "admin" | "user"
	hiddentOnLogin?: boolean;
	icon?: string;
}
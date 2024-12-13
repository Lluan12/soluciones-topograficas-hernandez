import { Timestamp } from "@angular/fire/firestore";

export interface Project {
	id?: string,
	title: string,
	description: string,
	images: string[],
	created: Timestamp
}
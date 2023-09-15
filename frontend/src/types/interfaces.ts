export interface IPointsOfInterest {
	title: string;
	category: string;
	description: string;
	longitude: number;
	latitude: number;
	price: string;
	city: string;
	website: string;
	post_code: string;
	province: string;
	country: string;
	phone_number: number;
	userId: number;
}

export interface LoginFormValues {
	first_name?: string;
	last_name?: string;
	user_name?: string;
	occupation?: string;
	email: string;
	password: string;
	location?: string;
	profile_image?: File | null;
}

export interface PoIFormValues {
	title: string;
	category: string;
	description: string;
	price?: number;
	website?: string;
	city?: string;
	post_code?: string;
	province: string;
	country?: string;
	phoneNumber?: string;
	address?: string;
	selectedOption: string;
	longitude?: number;
	latitude?: number;
	userId: string;
}

export interface UserData {
	user_name: string;
	profile_image?: string;
	first_name: string;
	last_name: string;
	occupation: string;
	email: string;
	location: string;
}

export interface IPointsOfInterest {
	id: number;
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

export interface ISnackbar {
	open: boolean;
	message: string;
	severity: 'success' | 'error';
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

export interface PointOfInterestModalProps {
	open: boolean;
	onClose: () => void;
	pointOfInterest: {
		id: number;
		title: string;
		description: string;
	};
	currentPostData?: object;
	postId?: number | null;
	loggedInUserId?: number | null;
}

export interface Post {
	id: number;
	rating: number;
	comment: string;
	userId: number;
}

export interface PostFormValues {
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

export interface ProfileUserData {
	user_name: string;
	profile_image?: string;
	first_name: string;
	last_name: string;
	occupation: string;
	email: string;
	location: string;
}

export interface RootLayoutProps {
	isLoggedIn: boolean;
	setIsLoggedIn: (value: boolean) => void;
}

export interface UserData {
	user_name: string;
	profile_image: string;
}

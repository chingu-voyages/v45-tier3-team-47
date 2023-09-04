export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  user_name?: string;
  occupation?: string;
  password: string;
  email: string;
  location?: string;
  profile_image?: string | null;
}

export interface IPost {
  rating?: number;
  comment?: string;
  userId: number;
  pointOfInterestId: number;
}

export interface IPointOfInterest {
  id: number;
  title: string;
  category: string;
  description?: string;
  longitude?: number;
  latitude?: number;
  price?: number;
  city?: string;
  website?: string;
  post_code?: string;
  province?: string;
  country?: string;
  phone_number?: string;
  userId: number;
}

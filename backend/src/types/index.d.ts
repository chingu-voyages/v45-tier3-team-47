export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  user_name?: string;
  occupation?: string;
  password?: string;
  email?: string;
  location?: string;
  profile_image?: string;
}

export interface IPost {
  rating?: number;
  comment?: string;
  userId: number;
}

export interface IPointOfInterest {
  title: string;
  category: string;
  description?: string;
  longitude?: number;
  latitude?: number;
  price?: number;
  city?: string;
  website?: string;
  postal_code?: string;
  province?: string;
  country?: string;
  phone_number?: string;
}

export interface IUser {
  user_name?: string;
  occupation?: string;
  password?: string;
  email?: string;
  location?: string;
  profile_image?: string;
}

export interface IPost {
  rating?: number;
  comments?: string;
}

export interface IPointOfInterest {
  title: string;
  description?: string;
  category:string;
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

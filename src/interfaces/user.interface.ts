export interface User {
    username: string;
    fullname?: string;
    email: string;
    password: string;
    bio?: string;
    profile_picture?: string;
    banner_picture?: string;
    ubication?: string;
    link?: string;
    birth_date?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    roles?: string[];
  }
  
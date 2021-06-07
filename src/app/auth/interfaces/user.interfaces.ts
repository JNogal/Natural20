export interface UserDto {
  username: string;
  email: string;
  password: string;
  id?: number;
  name?: string;
  surname?: string;
  age?: number;
  city?: string;
  userImg?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
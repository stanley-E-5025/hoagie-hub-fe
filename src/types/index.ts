export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Hoagie {
  _id: string;
  name: string;
  ingredients: string[];
  picture?: string;
  creator: User;
  collaborators?: User[];
  createdAt?: string;
  updatedAt?: string;
  commentCount?: number;
}

export interface Comment {
  _id: string;
  text: string;
  user: User;
  hoagie: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export type PaginatedHoagiesResponse = PaginatedResponse<Hoagie>;
export type PaginatedUsersResponse = PaginatedResponse<User>;

export interface CreateHoagiePayload {
  name: string;
  ingredients: string[];
  picture?: string;
}

export interface UpdateHoagiePayload {
  name?: string;
  ingredients?: string[];
  picture?: string;
}

export interface CreateCommentPayload {
  text: string;
  hoagieId: string;
}

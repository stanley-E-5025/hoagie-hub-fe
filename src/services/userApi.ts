import apiClient from './apiClient';
import {User, PaginatedUsersResponse} from '../types';

export const findOrCreateUser = async (
  email: string,
  name: string,
): Promise<User> => {
  try {
    const response = await apiClient.post<User>('/users', {email, name});
    return response.data;
  } catch (error: any) {
    console.error(
      'Error finding or creating user:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to sign in/up');
  }
};

export const loginUser = async (email: string): Promise<User> => {
  try {
    const response = await apiClient.post<User>('/users/login', {email});
    return response.data;
  } catch (error: any) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
};

export const searchUsers = async (
  query: string,
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedUsersResponse> => {
  try {
    const response = await apiClient.get<PaginatedUsersResponse>(
      '/users/search',
      {
        params: {
          q: query,
          page,
          limit,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error searching users:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to search users');
  }
};

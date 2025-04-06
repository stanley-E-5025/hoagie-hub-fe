import apiClient, {handleApiError} from './apiClient';
import {Hoagie, CreateHoagiePayload, UpdateHoagiePayload} from '../types';
import {AxiosResponse} from 'axios';

interface ApiPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Fetches paginated hoagies from the API
 * @param pageParam - The page number to fetch, defaults to 1
 * @returns Promise with paginated hoagie data
 */
export const getHoagiesList = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}): Promise<ApiPaginatedResponse<Hoagie>> => {
  try {
    const response: AxiosResponse<ApiPaginatedResponse<Hoagie>> =
      await apiClient.get<ApiPaginatedResponse<Hoagie>>('/hoagies', {
        params: {page: pageParam, limit: 10},
      });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch hoagies');
  }
};

/**
 * Fetches a single hoagie by ID
 * @param id - The hoagie ID to fetch
 * @returns Promise with the hoagie data
 */
export const getHoagieDetails = async (id: string): Promise<Hoagie> => {
  try {
    const response: AxiosResponse<Hoagie> = await apiClient.get<Hoagie>(
      `/hoagies/${id}`,
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to fetch hoagie with ID: ${id}`);
  }
};

/**
 * Creates a new hoagie
 * @param payload - The hoagie data and creator user ID
 * @returns Promise with the created hoagie data
 */
export const createHoagie = async (
  payload: CreateHoagiePayload & {userId: string},
): Promise<Hoagie> => {
  try {
    const response: AxiosResponse<Hoagie> = await apiClient.post<Hoagie>(
      '/hoagies',
      payload,
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to create hoagie');
  }
};

/**
 * Updates an existing hoagie
 * @param id - The hoagie ID to update
 * @param userId - The ID of the user making the update
 * @param payload - The data to update
 * @returns Promise with the updated hoagie data
 */
export const updateHoagie = async (
  id: string,
  userId: string,
  payload: UpdateHoagiePayload,
): Promise<Hoagie> => {
  try {
    const response: AxiosResponse<Hoagie> = await apiClient.patch<Hoagie>(
      `/hoagies/${id}/user/${userId}`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to update hoagie with ID: ${id}`);
  }
};

/**
 * Deletes a hoagie by ID
 * @param id - The hoagie ID to delete
 * @param userId - The ID of the user making the deletion request
 * @returns Promise with success status
 */
export const deleteHoagie = async (
  id: string,
  userId: string,
): Promise<{success: boolean}> => {
  try {
    const response: AxiosResponse<{success: boolean}> = await apiClient.delete<{
      success: boolean;
    }>(`/hoagies/${id}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to delete hoagie with ID: ${id}`);
  }
};

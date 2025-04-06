import axios, {AxiosInstance, AxiosRequestConfig, AxiosError} from 'axios';
import config from '../constants/config';

// Define API error interface for consistency
export interface ApiError {
  message: string;
  status?: number;
  details?: unknown;
}

// Create a typed API client
const apiClient: AxiosInstance = axios.create({
  baseURL: config.api.baseUrl,
  headers: config.api.defaultHeaders,
  timeout: config.api.timeout,
});

/**
 * Centralized error handling utility for API calls
 * @param error - The axios error object
 * @param defaultMessage - Default message to display if error details not available
 * @returns Error with appropriate message
 */
export const handleApiError = (
  error: unknown,
  defaultMessage: string,
): Error => {
  const axiosError = error as AxiosError<ApiError>;
  console.error(
    `API Error: ${defaultMessage}:`,
    axiosError.response?.data || axiosError.message,
  );
  return new Error(axiosError.response?.data?.message || defaultMessage);
};

export default apiClient;

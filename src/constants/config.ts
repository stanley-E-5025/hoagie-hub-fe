import {API_URL} from '@env';

/**
 * Application Configuration
 *
 * Centralizes all configuration values from environment variables
 * and provides default values when environment variables are not set.
 */
export const config = {
  /**
   * API Configuration
   */
  api: {
    /**
     * Base URL for API requests
     * Falls back to localhost if not provided in environment
     */
    baseUrl: API_URL || 'http://localhost:3000/v1',

    /**
     * API request timeout in milliseconds
     */
    timeout: 10000,

    /**
     * Default API headers
     */
    defaultHeaders: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },

  /**
   * Feature flags
   */
  features: {
    /**
     * Enable or disable features still in development
     */
    enableBetaFeatures: false,
  },
};

export default config;

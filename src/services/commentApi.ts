import apiClient, {handleApiError} from './apiClient';
import {Comment, PaginatedResponse, CreateCommentPayload} from '../types';

interface FetchCommentsParams {
  hoagieId: string;
  page?: number;
  limit?: number;
}

/**
 * Fetches paginated comments for a specific hoagie
 * @param params - Parameters including hoagieId, page, and limit
 * @returns Promise with paginated comment data
 */
export const getCommentsByHoagieId = async ({
  hoagieId,
  page = 1,
  limit = 10,
}: FetchCommentsParams): Promise<PaginatedResponse<Comment>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<Comment>>(
      `/comments/hoagie/${hoagieId}`,
      {
        params: {
          page,
          limit,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw handleApiError(
      error,
      `Failed to fetch comments for hoagie: ${hoagieId}`,
    );
  }
};

/**
 * Creates a new comment
 * @param payload - Comment data with text, hoagieId, and userId
 * @returns Promise with the created comment
 */
export const createComment = async ({
  text,
  hoagieId,
  userId,
}: CreateCommentPayload & {userId: string}): Promise<Comment> => {
  try {
    const response = await apiClient.post<Comment>('/comments', {
      text,
      hoagieId,
      userId,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to create comment');
  }
};

/**
 * Deletes a comment
 * @param commentId - ID of the comment to delete
 * @param userId - ID of the user making the deletion request
 * @returns Promise with success status
 */
export const deleteComment = async (
  commentId: string,
  userId: string,
): Promise<{success: boolean}> => {
  try {
    const response = await apiClient.delete<{success: boolean}>(
      `/comments/${commentId}/user/${userId}`,
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to delete comment: ${commentId}`);
  }
};

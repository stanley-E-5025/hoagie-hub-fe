import apiClient from './apiClient';

export const addCollaborator = async (
  hoagieId: string,
  collaboratorId: string,
  userId: string,
): Promise<{success: boolean}> => {
  try {
    const response = await apiClient.post(
      `/hoagies/${hoagieId}/collaborators/${collaboratorId}/user/${userId}`,
    );
    return {success: true};
  } catch (error: any) {
    console.error(
      'Error adding collaborator:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Failed to add collaborator',
    );
  }
};

export const removeCollaborator = async (
  hoagieId: string,
  collaboratorId: string,
  userId: string,
): Promise<{success: boolean}> => {
  try {
    const response = await apiClient.delete(
      `/hoagies/${hoagieId}/collaborators/${collaboratorId}/user/${userId}`,
    );
    return {success: true};
  } catch (error: any) {
    console.error(
      'Error removing collaborator:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Failed to remove collaborator',
    );
  }
};

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {User} from '../types';
import {COLORS, TEXT_STYLES, LAYOUT} from '../constants/styles';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {addCollaborator} from '../services/collaboratorApi';
import UserSearchList from './UserSearchList';

type AddCollaboratorModalProps = {
  visible: boolean;
  onClose: () => void;
  hoagieId: string;
  userId: string;
  existingCollaborators: User[];
};

/**
 * AddCollaboratorModal Component
 *
 * Modal for searching and adding collaborators to a hoagie
 */
const AddCollaboratorModal = ({
  visible,
  onClose,
  hoagieId,
  userId,
  existingCollaborators,
}: AddCollaboratorModalProps) => {
  const queryClient = useQueryClient();

  // Add collaborator mutation
  const addCollaboratorMutation = useMutation({
    mutationFn: (collaboratorId: string) =>
      addCollaborator(hoagieId, collaboratorId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['hoagie', hoagieId]});
      Alert.alert('Success', 'Collaborator added successfully');
    },
    onError: (error: Error) => {
      Alert.alert('Error', error.message);
    },
  });

  const handleAddCollaborator = (user: User) => {
    addCollaboratorMutation.mutate(user._id);
  };

  // Get IDs to exclude (creator and existing collaborators)
  const excludeUserIds = [
    userId,
    ...existingCollaborators.map(collaborator => collaborator._id),
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}>
      <SafeAreaView style={LAYOUT.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Add Collaborator</Text>
          <View style={{width: 40}} />
        </View>

        <UserSearchList
          onSelectUser={handleAddCollaborator}
          excludeUserIds={excludeUserIds}
          selectedUserId={
            addCollaboratorMutation.isPending
              ? (addCollaboratorMutation.variables as string)
              : undefined
          }
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    ...LAYOUT.header,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    ...TEXT_STYLES.subtitle,
    marginBottom: 0,
  },
  closeButton: {
    padding: 8,
  },
});

export default AddCollaboratorModal;

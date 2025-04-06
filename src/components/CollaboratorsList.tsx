import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {User} from '../types';
import {COLORS, TEXT_STYLES, LAYOUT, CARDS} from '../constants/styles';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {removeCollaborator} from '../services/collaboratorApi';

type CollaboratorsListProps = {
  hoagieId: string;
  collaborators: User[];
  currentUserId: string;
  isCreator: boolean;
  onAddCollaboratorPress: () => void;
};

const CollaboratorsList = ({
  hoagieId,
  collaborators,
  currentUserId,
  isCreator,
  onAddCollaboratorPress,
}: CollaboratorsListProps) => {
  const queryClient = useQueryClient();

  const removeCollaboratorMutation = useMutation({
    mutationFn: (collaboratorId: string) =>
      removeCollaborator(hoagieId, collaboratorId, currentUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['hoagie', hoagieId]});
    },
  });

  const handleRemoveCollaborator = (collaborator: User) => {
    if (!isCreator) return;

    Alert.alert(
      'Remove Collaborator',
      `Are you sure you want to remove ${collaborator.name} as a collaborator?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            removeCollaboratorMutation.mutate(collaborator._id);
          },
        },
      ],
    );
  };

  const renderCollaboratorItem = ({item}: {item: User}) => (
    <View style={styles.collaboratorItem}>
      <View style={styles.collaboratorAvatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.collaboratorInfo}>
        <Text style={styles.collaboratorName}>{item.name}</Text>
        <Text style={styles.collaboratorEmail}>{item.email}</Text>
      </View>
      {isCreator && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveCollaborator(item)}
          disabled={removeCollaboratorMutation.isPending}>
          {removeCollaboratorMutation.isPending &&
          removeCollaboratorMutation.variables === item._id ? (
            <ActivityIndicator size="small" color={COLORS.error} />
          ) : (
            <Text style={styles.removeButtonText}>X</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Collaborators</Text>
        {isCreator && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={onAddCollaboratorPress}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>

      {collaborators.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No collaborators yet</Text>
        </View>
      ) : (
        <FlatList
          data={collaborators}
          renderItem={renderCollaboratorItem}
          keyExtractor={item => item._id}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    ...TEXT_STYLES.subtitle,
    marginBottom: 0,
  },
  addButton: {
    padding: 4,
  },
  addButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  emptyContainer: {
    backgroundColor: COLORS.card,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  emptyText: {
    ...TEXT_STYLES.caption,
    fontStyle: 'italic',
  },
  collaboratorItem: {
    ...CARDS.container,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 0,
    padding: 12,
  },
  collaboratorAvatar: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    color: COLORS.card,
    fontWeight: 'bold',
  },
  collaboratorInfo: {
    flex: 1,
  },
  collaboratorName: {
    ...TEXT_STYLES.body,
    fontWeight: 'bold',
  },
  collaboratorEmail: {
    ...TEXT_STYLES.small,
    color: COLORS.text.secondary,
  },
  removeButton: {
    padding: 4,
  },
  removeButtonText: {
    color: COLORS.error,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CollaboratorsList;

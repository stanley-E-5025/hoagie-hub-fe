import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import {Hoagie, UpdateHoagiePayload} from '../types';
import {COLORS, TEXT_STYLES, LAYOUT, FORMS} from '../constants/styles';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateHoagie} from '../services/hoagieApi';

type EditHoagieModalProps = {
  visible: boolean;
  onClose: () => void;
  hoagie: Hoagie;
  userId: string;
};

const EditHoagieModal = ({
  visible,
  onClose,
  hoagie,
  userId,
}: EditHoagieModalProps) => {
  const [name, setName] = useState(hoagie.name);
  const [ingredients, setIngredients] = useState(hoagie.ingredients.join(', '));
  const [picture, setPicture] = useState(hoagie.picture || '');
  const queryClient = useQueryClient();

  // Update hoagie mutation
  const updateHoagieMutation = useMutation({
    mutationFn: () => {
      const payload: UpdateHoagiePayload = {
        name,
        ingredients: ingredients
          .split(',')
          .map(i => i.trim())
          .filter(i => i),
        picture: picture || undefined,
      };
      return updateHoagie(hoagie._id, userId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['hoagie', hoagie._id]});
      Alert.alert('Success', 'Hoagie updated successfully');
      onClose();
    },
    onError: (error: Error) => {
      Alert.alert('Error', error.message);
    },
  });

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }

    if (!ingredients.trim()) {
      Alert.alert('Error', 'At least one ingredient is required');
      return;
    }

    updateHoagieMutation.mutate();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}>
      <SafeAreaView style={LAYOUT.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Edit Sandwich</Text>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={updateHoagieMutation.isPending}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.container}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Sandwich name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Ingredients (comma separated)</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={ingredients}
              onChangeText={setIngredients}
              placeholder="Ham, Cheese, Lettuce, etc."
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Picture URL (optional)</Text>
            <TextInput
              style={styles.input}
              value={picture}
              onChangeText={setPicture}
              placeholder="https://example.com/image.jpg"
              autoCapitalize="none"
            />
          </View>
        </ScrollView>

        {updateHoagieMutation.isPending && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Updating...</Text>
          </View>
        )}
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
  saveText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    padding: 8,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    ...TEXT_STYLES.body,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    borderRadius: 4,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.card,
    marginTop: 12,
    fontWeight: 'bold',
  },
});

export default EditHoagieModal;

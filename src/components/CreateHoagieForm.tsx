import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createHoagie} from '../services/hoagieApi';
import {COLORS, TEXT_STYLES} from '../constants/styles';
import {FormField, Button} from './ui';

type ValidationErrors = {
  name?: string;
  ingredients?: string;
  picture?: string;
};

type CreateHoagieFormProps = {
  userId: string;
  onSuccess?: () => void;
};

/**
 * CreateHoagieForm Component
 *
 * Form for creating a new hoagie with validation
 */
const CreateHoagieForm = ({userId, onSuccess}: CreateHoagieFormProps) => {
  const [name, setName] = useState('');
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [pictureUrl, setPictureUrl] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );

  const queryClient = useQueryClient();

  // Clear validation errors when form values change
  useEffect(() => {
    const newErrors = {...validationErrors};

    if (name && newErrors.name) {
      delete newErrors.name;
    }

    if (ingredients.length > 0 && newErrors.ingredients) {
      delete newErrors.ingredients;
    }

    if (
      Object.keys(newErrors).length !== Object.keys(validationErrors).length
    ) {
      setValidationErrors(newErrors);
    }
  }, [name, ingredients, validationErrors]);

  // Create hoagie mutation
  const createHoagieMutation = useMutation({
    mutationFn: () => {
      return createHoagie({
        name,
        ingredients,
        picture: pictureUrl || undefined,
        userId,
      });
    },
    onSuccess: () => {
      // Reset form and invalidate hoagies cache
      setName('');
      setIngredients([]);
      setIngredientInput('');
      setPictureUrl('');
      setValidationErrors({});

      // Invalidate and refetch hoagies list
      queryClient.invalidateQueries({queryKey: ['hoagies']});

      // Show success message
      Alert.alert('Success', 'Your hoagie has been created!');

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      Alert.alert('Error', `Failed to create hoagie: ${error.message}`);
    },
  });

  const addIngredient = useCallback(() => {
    if (ingredientInput.trim()) {
      setIngredients(prev => [...prev, ingredientInput.trim()]);
      setIngredientInput('');
    }
  }, [ingredientInput]);

  const removeIngredient = useCallback((index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  }, []);

  const validateForm = useCallback(() => {
    const errors: ValidationErrors = {};

    if (!name.trim()) {
      errors.name = 'Please enter a hoagie name';
    }

    if (ingredients.length === 0) {
      errors.ingredients = 'Please add at least one ingredient';
    }

    if (pictureUrl && !pictureUrl.startsWith('http')) {
      errors.picture = 'Please enter a valid URL starting with http';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [name, ingredients, pictureUrl]);

  const handleCreateHoagie = useCallback(() => {
    if (validateForm()) {
      createHoagieMutation.mutate();
    } else {
      // First error message as alert
      const firstError = Object.values(validationErrors)[0];
      if (firstError) {
        Alert.alert('Validation Error', firstError);
      }
    }
  }, [validateForm, createHoagieMutation, validationErrors]);

  return (
    <View style={styles.formContainer}>
      {/* Name input */}
      <FormField
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Enter hoagie name"
        error={validationErrors.name}
        autoCapitalize="words"
        maxLength={50}
        accessibilityLabel="Hoagie name input"
        accessibilityHint="Enter the name for your hoagie"
      />

      {/* Ingredients input */}
      <Text style={styles.label}>Ingredients</Text>
      <View style={styles.ingredientInputContainer}>
        <TextInput
          style={[
            styles.ingredientInput,
            validationErrors.ingredients && styles.inputError,
          ]}
          placeholder="Add an ingredient"
          value={ingredientInput}
          onChangeText={setIngredientInput}
          autoCapitalize="words"
          onSubmitEditing={addIngredient}
          returnKeyType="done"
          accessibilityLabel="Ingredient input"
          accessibilityHint="Enter an ingredient and press Add or return"
        />
        <Button
          title="Add"
          onPress={addIngredient}
          size="small"
          textStyle={{color: '#ffffff'}}
          accessibilityLabel="Add ingredient button"
          accessibilityHint="Adds the ingredient to your hoagie"
        />
      </View>
      {validationErrors.ingredients && (
        <Text style={styles.errorText}>{validationErrors.ingredients}</Text>
      )}

      {/* Ingredients list */}
      <View
        style={styles.ingredientsContainer}
        accessibilityLabel="Ingredients list"
        accessibilityHint="List of ingredients added to your hoagie">
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Text style={styles.ingredientText}>{ingredient}</Text>
            <TouchableOpacity
              onPress={() => removeIngredient(index)}
              style={styles.removeButton}
              accessibilityLabel={`Remove ${ingredient}`}
              accessibilityHint={`Removes ${ingredient} from your hoagie`}>
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        {ingredients.length === 0 && (
          <Text style={styles.noIngredientsText}>No ingredients added yet</Text>
        )}
      </View>

      {/* Picture URL input (optional) */}
      <FormField
        label="Picture URL (optional)"
        value={pictureUrl}
        onChangeText={setPictureUrl}
        placeholder="Enter image URL"
        error={validationErrors.picture}
        autoCapitalize="none"
        keyboardType="url"
        accessibilityLabel="Picture URL input"
        accessibilityHint="Enter a URL for your hoagie image"
      />

      {/* Create button */}
      <Button
        title="Create Hoagie"
        onPress={handleCreateHoagie}
        disabled={createHoagieMutation.isPending}
        loading={createHoagieMutation.isPending}
        style={styles.createButton}
        textStyle={{color: '#ffffff'}}
        accessibilityLabel="Create hoagie button"
        accessibilityHint="Submits the form to create your hoagie"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
  },
  label: {
    ...TEXT_STYLES.caption,
    marginBottom: 4,
  },
  ingredientInputContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ingredientInput: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  ingredientsContainer: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    minHeight: 100,
  },
  ingredientItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ingredientText: {
    ...TEXT_STYLES.body,
    flex: 1,
  },
  removeButton: {
    padding: 4,
    backgroundColor: COLORS.error,
    borderRadius: 4,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: COLORS.card,
    fontWeight: 'bold',
    fontSize: 12,
  },
  noIngredientsText: {
    ...TEXT_STYLES.caption,
    color: COLORS.text.secondary,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 16,
  },
  errorText: {
    ...TEXT_STYLES.small,
    color: COLORS.error,
    marginTop: -4,
    marginBottom: 8,
  },
  createButton: {
    marginTop: 8,
  },
});

export default CreateHoagieForm;

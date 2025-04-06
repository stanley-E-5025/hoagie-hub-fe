import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {COLORS, TEXT_STYLES} from '../../constants/styles';

type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url';
  multiline?: boolean;
  maxLength?: number;
  autoCorrect?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  onSubmitEditing?: () => void;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
};

/**
 * FormField Component
 *
 * A reusable form field component with label, input, and error message
 */
const FormField = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry,
  autoCapitalize = 'none',
  keyboardType = 'default',
  multiline = false,
  maxLength,
  autoCorrect = true,
  accessibilityLabel,
  accessibilityHint,
  onSubmitEditing,
  returnKeyType,
}: FormFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          multiline && styles.multilineInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        multiline={multiline}
        maxLength={maxLength}
        autoCorrect={autoCorrect}
        accessibilityLabel={accessibilityLabel || `${label} input field`}
        accessibilityHint={accessibilityHint}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    ...TEXT_STYLES.caption,
    marginBottom: 4,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    color: COLORS.text.primary,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    ...TEXT_STYLES.small,
    color: COLORS.error,
    marginTop: 4,
  },
});

export default FormField;

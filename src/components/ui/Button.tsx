import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {COLORS, TEXT_STYLES} from '../../constants/styles';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

/**
 * Button Component
 *
 * A reusable button component with multiple variants and states
 */
const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  accessibilityLabel,
  accessibilityHint,
}: ButtonProps) => {
  // Determine styles based on variant and size
  const getContainerStyle = () => {
    let variantStyle;

    switch (variant) {
      case 'secondary':
        variantStyle = styles.secondaryContainer;
        break;
      case 'outline':
        variantStyle = styles.outlineContainer;
        break;
      case 'danger':
        variantStyle = styles.dangerContainer;
        break;
      default:
        variantStyle = styles.primaryContainer;
    }

    let sizeStyle;
    switch (size) {
      case 'small':
        sizeStyle = styles.smallContainer;
        break;
      case 'large':
        sizeStyle = styles.largeContainer;
        break;
      default:
        sizeStyle = styles.mediumContainer;
    }

    return [
      styles.container,
      variantStyle,
      sizeStyle,
      disabled && styles.disabledContainer,
      style,
    ];
  };

  const getTextStyle = () => {
    let variantTextStyle;

    switch (variant) {
      case 'secondary':
        variantTextStyle = styles.secondaryText;
        break;
      case 'outline':
        variantTextStyle = styles.outlineText;
        break;
      case 'danger':
        variantTextStyle = styles.dangerText;
        break;
      default:
        variantTextStyle = styles.primaryText;
    }

    let sizeTextStyle;
    switch (size) {
      case 'small':
        sizeTextStyle = styles.smallText;
        break;
      case 'large':
        sizeTextStyle = styles.largeText;
        break;
      default:
        sizeTextStyle = styles.mediumText;
    }

    return [
      styles.text,
      variantTextStyle,
      sizeTextStyle,
      disabled && styles.disabledText,
      textStyle,
    ];
  };

  return (
    <TouchableOpacity
      style={getContainerStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel || `${title} button`}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{disabled: disabled || loading}}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? COLORS.card : COLORS.primary}
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
  },
  // Variant styles
  primaryContainer: {
    backgroundColor: COLORS.primary,
  },
  secondaryContainer: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dangerContainer: {
    backgroundColor: COLORS.error,
  },
  // Size styles
  smallContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  mediumContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  largeContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  // Text base style
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Text variant styles
  primaryText: {
    color: COLORS.card,
  },
  secondaryText: {
    color: COLORS.primary,
  },
  outlineText: {
    color: COLORS.text.primary,
  },
  dangerText: {
    color: COLORS.card,
  },
  // Text size styles
  smallText: {
    ...TEXT_STYLES.small,
  },
  mediumText: {
    ...TEXT_STYLES.body,
  },
  largeText: {
    ...TEXT_STYLES.subtitle,
    fontWeight: 'bold',
  },
  // Disabled styles
  disabledContainer: {
    backgroundColor: '#cccccc',
    borderColor: '#cccccc',
  },
  disabledText: {
    color: '#888888',
  },
});

export default Button;

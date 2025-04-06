import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {COLORS, TEXT_STYLES} from '../constants/styles';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

/**
 * Common style creators for consistent component styling across the app
 */
export const commonStyles = {
  /**
   * Create card styles with consistent appearance
   */
  card: (options?: {
    padding?: number;
    margin?: number;
  }): NamedStyles<{
    container: ViewStyle;
    content: ViewStyle;
  }> => {
    const padding = options?.padding ?? 16;
    const margin = options?.margin ?? 8;

    return StyleSheet.create({
      container: {
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginHorizontal: margin,
        marginVertical: margin,
        borderRadius: 4,
      },
      content: {
        padding,
      },
    });
  },

  /**
   * Create list item styles with consistent appearance
   */
  listItem: (options?: {
    padding?: number;
  }): NamedStyles<{
    container: ViewStyle;
    title: TextStyle;
    subtitle: TextStyle;
  }> => {
    const padding = options?.padding ?? 12;

    return StyleSheet.create({
      container: {
        backgroundColor: COLORS.card,
        padding,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 4,
      },
      title: {
        ...TEXT_STYLES.body,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      subtitle: {
        ...TEXT_STYLES.caption,
        color: COLORS.text.secondary,
      },
    });
  },

  /**
   * Create form input styles with consistent appearance
   */
  input: (): NamedStyles<{
    container: ViewStyle;
    input: TextStyle;
    label: TextStyle;
    error: TextStyle;
  }> => {
    return StyleSheet.create({
      container: {
        marginBottom: 16,
      },
      input: {
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 8,
        fontSize: 14,
        color: COLORS.text.primary,
        borderRadius: 4,
      },
      label: {
        ...TEXT_STYLES.caption,
        marginBottom: 4,
      },
      error: {
        ...TEXT_STYLES.caption,
        color: COLORS.error,
        marginTop: 4,
      },
    });
  },

  /**
   * Create button styles with consistent appearance
   */
  button: (options?: {
    variant?: 'primary' | 'secondary';
  }): NamedStyles<{
    container: ViewStyle;
    text: TextStyle;
    disabled: ViewStyle;
  }> => {
    const variant = options?.variant || 'primary';

    return StyleSheet.create({
      container: {
        backgroundColor: variant === 'primary' ? COLORS.primary : COLORS.card,
        padding: 8,
        alignItems: 'center',
        marginVertical: 8,
        borderRadius: 4,
        borderWidth: variant === 'secondary' ? 1 : 0,
        borderColor: variant === 'secondary' ? COLORS.border : undefined,
      },
      text: {
        color: variant === 'primary' ? COLORS.card : COLORS.text.primary,
        fontSize: 14,
        fontWeight: 'bold',
      },
      disabled: {
        backgroundColor: '#cccccc',
      },
    });
  },

  /**
   * Create section styles with consistent appearance
   */
  section: (): NamedStyles<{
    container: ViewStyle;
    title: TextStyle;
    content: ViewStyle;
  }> => {
    return StyleSheet.create({
      container: {
        marginBottom: 16,
      },
      title: {
        ...TEXT_STYLES.subtitle,
        marginBottom: 8,
      },
      content: {
        marginBottom: 8,
      },
    });
  },

  /**
   * Create header styles with consistent appearance
   */
  header: (): NamedStyles<{
    container: ViewStyle;
    title: TextStyle;
    rightButton: ViewStyle;
    rightButtonText: TextStyle;
    leftButton: ViewStyle;
    leftButtonText: TextStyle;
  }> => {
    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.card,
      },
      title: {
        ...TEXT_STYLES.title,
        marginBottom: 0,
      },
      rightButton: {
        padding: 8,
      },
      rightButtonText: {
        color: COLORS.primary,
        fontWeight: 'bold',
      },
      leftButton: {
        padding: 8,
      },
      leftButtonText: {
        color: COLORS.primary,
      },
    });
  },
};

export default commonStyles;

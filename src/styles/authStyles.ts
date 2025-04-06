import {StyleSheet} from 'react-native';
import {COLORS, TEXT_STYLES} from '../constants/styles';

/**
 * Styles for the Authentication Screen (Login/Signup)
 */
export const authStyles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    marginVertical: 24,
    alignItems: 'center',
  },
  input: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
  },
  title: {
    ...TEXT_STYLES.title,
    fontSize: 24,
    color: COLORS.primary,
  },
  switchButton: {
    marginTop: 24,
  },
  switchText: {
    color: COLORS.primary,
    fontSize: 14,
  },
});

export default authStyles;

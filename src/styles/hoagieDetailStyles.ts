import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/styles';

/**
 * Styles for the Hoagie Detail Screen
 */
export const hoagieDetailStyles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default hoagieDetailStyles;

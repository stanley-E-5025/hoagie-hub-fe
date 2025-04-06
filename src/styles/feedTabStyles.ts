import {StyleSheet} from 'react-native';
import {COLORS, TEXT_STYLES, LAYOUT} from '../constants/styles';

/**
 * Styles for the Feed Tab Screen
 */
export const feedTabStyles = StyleSheet.create({
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  header: {
    ...LAYOUT.header,
    justifyContent: 'center',
  },
  headerText: {
    ...TEXT_STYLES.title,
    marginBottom: 0,
  },
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    ...TEXT_STYLES.body,
    color: COLORS.text.secondary,
  },
});

export default feedTabStyles;

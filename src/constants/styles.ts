import {StyleSheet} from 'react-native';

// Simple color palette
export const COLORS = {
  primary: '#171717',
  background: '#ffffff',
  card: '#ffffff',
  text: {
    primary: '#000000',
    secondary: '#555555',
    tertiary: '#888888',
  },
  border: '#cccccc',
  error: '#cc0000',
};

// Basic text styles
export const TEXT_STYLES = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: COLORS.text.primary,
  },
  caption: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  small: {
    fontSize: 10,
    color: COLORS.text.tertiary,
  },
});

// Simple flexbox layouts
export const LAYOUT = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
});

// Simple form styles
export const FORMS = StyleSheet.create({
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: COLORS.text.primary,
    width: '100%',
    height: 50,
    borderRadius: 0,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: COLORS.card,
    fontSize: 14,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
});

// Simple card styles
export const CARDS = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  content: {
    padding: 16,
  },
});

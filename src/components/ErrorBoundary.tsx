import React, {Component, ErrorInfo, ReactNode} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {COLORS, TEXT_STYLES, LAYOUT} from '../constants/styles';

interface Props {
  /**
   * Child components to render when no error is present
   */
  children: ReactNode;
  /**
   * Optional custom fallback UI to display when an error occurs
   */
  fallback?: ReactNode;
  /**
   * Optional callback to execute when an error is caught
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  /**
   * Whether an error has been caught
   */
  hasError: boolean;
  /**
   * The error that was caught, if any
   */
  error: Error | null;
  /**
   * Additional error information
   */
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary Component
 *
 * A class component that catches JavaScript errors anywhere in its child component tree.
 * Prevents the entire app from crashing when an error occurs in a component.
 * Provides a fallback UI and option to retry/reset the error state.
 *
 * Usage:
 * ```jsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Update state when an error occurs in the component tree
   */
  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Lifecycle method called when an error is caught
   * Log the error and call the onError callback if provided
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({errorInfo});

    // Log error to console (in production, would log to an error reporting service)
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo.componentStack);

    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  /**
   * Reset the error state to allow re-rendering the children
   */
  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    const {hasError, error, errorInfo} = this.state;
    const {children, fallback} = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <Text style={styles.title} accessibilityRole="header">
                Something went wrong
              </Text>

              <Text style={styles.message} accessibilityRole="text">
                {error?.message || 'An unexpected error occurred'}
              </Text>

              {__DEV__ && errorInfo && (
                <ScrollView style={styles.errorInfoContainer}>
                  <Text style={styles.errorInfoText}>
                    {errorInfo.componentStack}
                  </Text>
                </ScrollView>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={this.resetError}
                accessibilityRole="button"
                accessibilityLabel="Try Again"
                accessibilityHint="Resets the error and tries to render the component again">
                <Text style={styles.buttonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }

    return children;
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    ...LAYOUT.center,
    padding: 24,
  },
  title: {
    ...TEXT_STYLES.title,
    color: COLORS.error,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    ...TEXT_STYLES.body,
    textAlign: 'center',
    marginBottom: 24,
    color: COLORS.text.primary,
  },
  errorInfoContainer: {
    maxHeight: 200,
    marginBottom: 24,
    padding: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    width: '100%',
  },
  errorInfoText: {
    ...TEXT_STYLES.small,
    color: COLORS.text.secondary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ErrorBoundary;

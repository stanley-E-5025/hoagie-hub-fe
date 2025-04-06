import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ListRenderItem,
} from 'react-native';
import {COLORS, TEXT_STYLES, LAYOUT} from '../../constants/styles';

type ListProps<T> = {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  ListEmptyComponent?: React.ReactElement;
  ListHeaderComponent?: React.ReactElement;
  onRefresh?: () => void;
  refreshing?: boolean;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  contentContainerStyle?: ViewStyle;
  style?: ViewStyle;
  horizontal?: boolean;
  emptyText?: string;
  errorText?: string;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
};

/**
 * List Component
 *
 * A reusable list component that handles loading, error, and empty states
 */
function List<T>({
  data,
  renderItem,
  keyExtractor,
  ListEmptyComponent,
  ListHeaderComponent,
  onRefresh,
  refreshing = false,
  onEndReached,
  onEndReachedThreshold = 0.5,
  isLoading = false,
  isLoadingMore = false,
  error = null,
  onRetry,
  contentContainerStyle,
  style,
  horizontal = false,
  emptyText = 'No items found',
  errorText = 'Error loading data',
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
}: ListProps<T>) {
  // If loading show activity indicator
  if (isLoading && data.length === 0) {
    return (
      <View style={LAYOUT.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // If error show error message with retry button
  if (error && data.length === 0) {
    return (
      <View style={LAYOUT.center}>
        <Text style={styles.errorText}>
          {errorText}: {error.message}
        </Text>
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // Default empty component if none provided
  const defaultEmptyComponent = (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{emptyText}</Text>
    </View>
  );

  // Loading more component for infinite scrolling
  const loadingMoreComponent = isLoadingMore ? (
    <View style={styles.loadingMoreContainer}>
      <ActivityIndicator size="small" color={COLORS.primary} />
    </View>
  ) : null;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={ListEmptyComponent || defaultEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={loadingMoreComponent}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      contentContainerStyle={[
        data.length === 0 && styles.emptyListContentContainer,
        contentContainerStyle,
      ]}
      style={style}
      horizontal={horizontal}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    ...TEXT_STYLES.body,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  errorText: {
    ...TEXT_STYLES.body,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  retryButtonText: {
    color: COLORS.card,
    fontWeight: 'bold',
  },
  loadingMoreContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  emptyListContentContainer: {
    flexGrow: 1,
  },
});

export default List;

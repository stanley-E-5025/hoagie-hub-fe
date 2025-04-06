import React, {useCallback, useMemo} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getHoagiesList} from '../services/hoagieApi';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {Hoagie} from '../types';
import HoagieCard from '../components/HoagieCard';
import {COLORS, LAYOUT} from '../constants/styles';
import {exists} from '../utils/safeAccess';
import feedTabStyles from '../styles/feedTabStyles';

// Update RootStackParamList type to include HoagieDetail screen
type ExtendedRootStackParamList = RootStackParamList & {
  HoagieDetail: {hoagieId: string};
};

type FeedTabNavigationProp =
  NativeStackNavigationProp<ExtendedRootStackParamList>;

/**
 * FeedTabScreen Component
 *
 * Displays a paginated, infinite-scrolling list of hoagies.
 * Handles loading, error, and empty states.
 * Uses React Query for efficient data fetching and caching.
 */
const FeedTabScreen = () => {
  const navigation = useNavigation<FeedTabNavigationProp>();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['hoagies'],
    queryFn: getHoagiesList,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Calculate next page based on lastPage data and total count
      const morePagesExist = lastPage.page * lastPage.limit < lastPage.total;
      return morePagesExist ? lastPage.page + 1 : undefined;
    },
  });

  // Flatten the pages array for FlatList - use useMemo to avoid recomputation on re-renders
  const hoagies = useMemo<Hoagie[]>(() => {
    // Use safe access patterns to handle potentially null data
    return data?.pages?.flatMap(page => page.data) ?? [];
  }, [data]);

  // Use useCallback for event handlers to maintain stable references
  const handleRetry = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const navigateToDetail = useCallback(
    (hoagieId: string) => {
      navigation.navigate('HoagieDetail', {hoagieId});
    },
    [navigation],
  );

  const renderHoagieCard = useCallback(
    ({item}: {item: Hoagie}) => (
      <HoagieCard hoagie={item} onPress={() => navigateToDetail(item._id)} />
    ),
    [navigateToDetail],
  );

  if (status === 'pending') {
    return (
      <View style={LAYOUT.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={LAYOUT.center}>
        <Text style={feedTabStyles.errorText}>
          Error: {exists(error) ? (error as Error).message : 'Unknown error'}
        </Text>
        <TouchableOpacity
          style={feedTabStyles.retryButton}
          onPress={handleRetry}>
          <Text style={feedTabStyles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={LAYOUT.safeArea}>
      <View style={feedTabStyles.header}>
        <Text style={feedTabStyles.headerText}>Hoagie Feed</Text>
      </View>
      <FlatList
        data={hoagies}
        renderItem={renderHoagieCard}
        keyExtractor={item => item._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={feedTabStyles.footer}>
              <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
          ) : null
        }
        contentContainerStyle={feedTabStyles.listContent}
        ListEmptyComponent={
          !isFetching ? (
            <View style={feedTabStyles.emptyContainer}>
              <Text style={feedTabStyles.emptyText}>No hoagies found</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default FeedTabScreen;

import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Comment} from '../types';
import {COLORS, TEXT_STYLES, LAYOUT} from '../constants/styles';

interface CommentsListProps {
  comments: Comment[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  error: unknown;
  onLoadMore: () => void;
  hasNextPage?: boolean;
  totalComments?: number;
}

const CommentsList = ({
  comments,
  isLoading,
  isFetchingNextPage,
  error,
  onLoadMore,
  hasNextPage,
  totalComments = 0,
}: CommentsListProps) => {
  const renderCommentItem = useCallback(
    ({item}: {item: Comment}) => (
      <View style={styles.commentItem}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentAuthor}>{item.user.name}</Text>
          <Text style={styles.commentDate}>
            {new Date(item.createdAt || '').toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
      </View>
    ),
    [],
  );

  const handleLoadMoreComments = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      onLoadMore();
    }
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }, [isFetchingNextPage]);

  return (
    <View style={styles.commentsSection}>
      <Text style={styles.commentCount}>
        Comments {totalComments > 0 ? `(${totalComments})` : ''}
      </Text>

      {isLoading && !isFetchingNextPage ? (
        <ActivityIndicator size="small" color={COLORS.primary} />
      ) : error ? (
        <Text style={styles.errorText}>
          Error loading comments: {(error as Error).message}
        </Text>
      ) : (
        <>
          {comments.length > 0 ? (
            <FlatList
              data={comments}
              renderItem={renderCommentItem}
              keyExtractor={item => item._id}
              onEndReached={handleLoadMoreComments}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={
                <Text style={styles.noCommentsText}>No comments yet</Text>
              }
              scrollEnabled={false} // Disable scrolling as parent ScrollView handles it
              style={styles.commentsList}
            />
          ) : (
            <Text style={styles.noCommentsText}>No comments yet</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentsSection: {
    padding: 16,
    paddingTop: 0,
  },
  commentCount: {
    ...TEXT_STYLES.caption,
    marginBottom: 8,
  },
  commentsList: {
    marginTop: 16,
  },
  commentItem: {
    backgroundColor: COLORS.card,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentAuthor: {
    ...TEXT_STYLES.body,
    fontWeight: 'bold',
  },
  commentDate: {
    ...TEXT_STYLES.small,
    color: COLORS.text.tertiary,
  },
  commentText: {
    ...TEXT_STYLES.body,
  },
  loadingFooter: {
    padding: 16,
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  noCommentsText: {
    ...TEXT_STYLES.caption,
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 16,
  },
});

export default React.memo(CommentsList);

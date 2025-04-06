import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import {getHoagieDetails} from '../services/hoagieApi';
import {getCommentsByHoagieId, createComment} from '../services/commentApi';
import {useAppSelector} from '../store/hooks';
import {LAYOUT, FORMS} from '../constants/styles';

// Components
import DetailScreenHeader from '../components/DetailScreenHeader';
import HoagieDetails from '../components/HoagieDetails';
import CommentsList from '../components/CommentsList';
import CommentInput from '../components/CommentInput';
import AddCollaboratorModal from '../components/AddCollaboratorModal';
import EditHoagieModal from '../components/EditHoagieModal';

// Styles
import hoagieDetailStyles from '../styles/hoagieDetailStyles';

type HoagieDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'HoagieDetail'
>;

const COMMENTS_PER_PAGE = 10;

/**
 * HoagieDetailScreen Component
 *
 * Displays detailed information about a specific hoagie including:
 * - Hoagie image, name, and ingredients
 * - Creator information
 * - Collaborators list with management options
 * - Comments section with infinite scrolling
 * - Option to add new comments
 *
 * Uses React Query for efficient data fetching, caching, and mutations.
 */
const HoagieDetailScreen = ({route, navigation}: HoagieDetailScreenProps) => {
  const {hoagieId} = route.params;
  const [showAddCollaboratorModal, setShowAddCollaboratorModal] =
    useState(false);
  const [showEditHoagieModal, setShowEditHoagieModal] = useState(false);
  const {user} = useAppSelector(state => state.auth);
  const queryClient = useQueryClient();

  // Fetch hoagie details
  const {
    data: hoagie,
    isLoading: isLoadingHoagie,
    error: hoagieError,
  } = useQuery({
    queryKey: ['hoagie', hoagieId],
    queryFn: () => getHoagieDetails(hoagieId),
  });

  // Fetch comments with infinite query
  const {
    data: commentsData,
    isLoading: isLoadingComments,
    error: commentsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['comments', hoagieId],
    queryFn: ({pageParam = 1}) =>
      getCommentsByHoagieId({
        hoagieId,
        page: pageParam,
        limit: COMMENTS_PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const {page, limit, total} = lastPage;
      const nextPage = page + 1;
      const totalPages = Math.ceil(total / limit);
      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: (text: string) =>
      createComment({
        text,
        hoagieId,
        userId: user?._id || '',
      }),
    onSuccess: () => {
      // Invalidate and refetch comments for this hoagie
      queryClient.invalidateQueries({queryKey: ['comments', hoagieId]});
    },
  });

  const handleAddComment = useCallback(
    (text: string) => {
      if (text.trim() && user) {
        addCommentMutation.mutate(text);
      }
    },
    [user, addCommentMutation],
  );

  const handleLoadMoreComments = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Check user permissions
  const isCreator = user?._id === hoagie?.creator._id;
  const canEditHoagie =
    isCreator ||
    hoagie?.collaborators?.some(collaborator => collaborator._id === user?._id);

  // Flatten the paginated comments data
  const comments = commentsData?.pages.flatMap(page => page.data) || [];
  const totalComments = commentsData?.pages[0]?.total || 0;

  if (isLoadingHoagie) {
    return (
      <View style={LAYOUT.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (hoagieError) {
    return (
      <View style={LAYOUT.center}>
        <Text style={hoagieDetailStyles.errorText}>
          Error loading hoagie: {(hoagieError as Error).message}
        </Text>
        <TouchableOpacity
          style={FORMS.button}
          onPress={() => navigation.goBack()}>
          <Text style={FORMS.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={LAYOUT.safeArea}>
      <KeyboardAvoidingView
        style={hoagieDetailStyles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView style={hoagieDetailStyles.scrollView}>
          {/* Header */}
          <DetailScreenHeader
            title="Hoagie Details"
            onBack={() => navigation.goBack()}
            onEdit={() => setShowEditHoagieModal(true)}
            canEdit={!!canEditHoagie && !!hoagie && !!user}
          />

          {/* Hoagie Details Section */}
          {hoagie && (
            <HoagieDetails
              hoagie={hoagie}
              currentUser={user}
              onAddCollaboratorPress={() => setShowAddCollaboratorModal(true)}
            />
          )}

          {/* Comments List Section */}
          <CommentsList
            comments={comments}
            isLoading={isLoadingComments}
            isFetchingNextPage={isFetchingNextPage}
            error={commentsError}
            onLoadMore={handleLoadMoreComments}
            hasNextPage={hasNextPage}
            totalComments={hoagie?.commentCount ?? totalComments}
          />
        </ScrollView>

        {/* Add comment section */}
        <CommentInput
          onSubmit={handleAddComment}
          isSubmitting={addCommentMutation.isPending}
          isAuthenticated={!!user}
        />

        {/* Modals */}
        {hoagie && user && (
          <>
            <AddCollaboratorModal
              visible={showAddCollaboratorModal}
              onClose={() => setShowAddCollaboratorModal(false)}
              hoagieId={hoagie._id}
              userId={user._id}
              existingCollaborators={hoagie.collaborators || []}
            />

            <EditHoagieModal
              visible={showEditHoagieModal}
              onClose={() => setShowEditHoagieModal(false)}
              hoagie={hoagie}
              userId={user._id}
            />
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HoagieDetailScreen;

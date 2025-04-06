import React, {useState, useCallback} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../constants/styles';
import commonStyles from '../styles/common';

interface CommentInputProps {
  onSubmit: (text: string) => void;
  isSubmitting: boolean;
  isAuthenticated: boolean;
}

const CommentInput = ({
  onSubmit,
  isSubmitting,
  isAuthenticated,
}: CommentInputProps) => {
  const [commentText, setCommentText] = useState('');
  const inputStyles = commonStyles.input();
  const buttonStyles = commonStyles.button();

  const handleAddComment = useCallback(() => {
    if (commentText.trim() && isAuthenticated) {
      onSubmit(commentText);
      setCommentText('');
    }
  }, [commentText, isAuthenticated, onSubmit]);

  const isDisabled = !commentText.trim() || !isAuthenticated || isSubmitting;

  return (
    <View style={styles.commentInputContainer}>
      <TextInput
        style={[inputStyles.input, styles.commentInput]}
        placeholder="Add a comment..."
        value={commentText}
        onChangeText={setCommentText}
        multiline
      />
      <TouchableOpacity
        style={[
          buttonStyles.container,
          styles.commentButton,
          isDisabled && buttonStyles.disabled,
        ]}
        onPress={handleAddComment}
        disabled={isDisabled}>
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={buttonStyles.text}>Post</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  commentInput: {
    flex: 1,
    marginRight: 8,
    marginBottom: 0,
    maxHeight: 80,
  },
  commentButton: {
    marginVertical: 0,
    width: 80,
  },
});

export default React.memo(CommentInput);

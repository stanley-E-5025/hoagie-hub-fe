import React, {memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Hoagie} from '../types';
import {COLORS, TEXT_STYLES} from '../constants/styles';
import commonStyles from '../styles/common';

/**
 * Props for the HoagieCard component
 */
type HoagieCardProps = {
  /**
   * Hoagie data to display in the card
   */
  hoagie: Hoagie;
  /**
   * Callback function when card is pressed
   */
  onPress: () => void;
};

const {width} = Dimensions.get('window');
const cardWidth = width - 32; // 16px padding on each side

/**
 * HoagieCard Component
 *
 * Displays a card with hoagie information, including image, name, ingredients,
 * creator, and comment count.
 *
 * Uses React.memo with a custom comparison function to optimize re-renders.
 * Only re-renders when the hoagie ID changes or the onPress handler changes.
 */
const HoagieCard = ({hoagie, onPress}: HoagieCardProps) => {
  const cardStyles = commonStyles.card({margin: 0});

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[cardStyles.container, styles.container]}
      accessibilityLabel={`Hoagie: ${hoagie.name}`}
      accessibilityRole="button">
      {hoagie.picture ? (
        <Image
          source={{uri: hoagie.picture}}
          style={styles.image}
          accessibilityLabel={`Image of ${hoagie.name}`}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={[cardStyles.content, styles.content]}>
        <Text style={styles.name} numberOfLines={1}>
          {hoagie.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {hoagie.ingredients.join(', ')}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.creatorName}>By {hoagie.creator.name}</Text>
          <View style={styles.commentCountContainer}>
            <Text style={styles.commentCount}>
              Comments: {hoagie.commentCount || 0}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.text.tertiary,
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  name: {
    ...TEXT_STYLES.title,
    marginBottom: 4,
  },
  description: {
    ...TEXT_STYLES.caption,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creatorName: {
    ...TEXT_STYLES.small,
    fontStyle: 'italic',
  },
  commentCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentCount: {
    ...TEXT_STYLES.small,
    marginLeft: 4,
    color: COLORS.text.secondary,
  },
});

/**
 * Memoized HoagieCard to prevent unnecessary re-renders
 * Re-renders only when the hoagie ID or onPress function reference changes
 */
export default memo(HoagieCard, (prevProps, nextProps) => {
  // Only re-render if the hoagie ID changes or if onPress handler changes reference
  return (
    prevProps.hoagie._id === nextProps.hoagie._id &&
    prevProps.onPress === nextProps.onPress
  );
});

import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Hoagie, User} from '../types';
import {COLORS, TEXT_STYLES} from '../constants/styles';
import CollaboratorsList from './CollaboratorsList';

interface HoagieDetailsProps {
  hoagie: Hoagie;
  currentUser: User | null;
  onAddCollaboratorPress: () => void;
}

const HoagieDetails = ({
  hoagie,
  currentUser,
  onAddCollaboratorPress,
}: HoagieDetailsProps) => {
  const isCreator = currentUser?._id === hoagie.creator._id;

  return (
    <>
      {/* Hoagie image */}
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

      {/* Hoagie details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.hoagieName}>{hoagie.name}</Text>
        <Text style={styles.creatorInfo}>Created by {hoagie.creator.name}</Text>

        <Text style={styles.sectionTitle}>Ingredients:</Text>
        <View style={styles.ingredientsContainer}>
          {hoagie.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
        </View>

        {/* Collaborators section */}
        {currentUser && (
          <CollaboratorsList
            hoagieId={hoagie._id}
            collaborators={hoagie.collaborators || []}
            currentUserId={currentUser._id}
            isCreator={isCreator}
            onAddCollaboratorPress={onAddCollaboratorPress}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: COLORS.text.tertiary,
  },
  detailsContainer: {
    padding: 16,
  },
  hoagieName: {
    ...TEXT_STYLES.title,
    fontSize: 24,
  },
  creatorInfo: {
    ...TEXT_STYLES.caption,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  sectionTitle: {
    ...TEXT_STYLES.subtitle,
    marginTop: 16,
  },
  ingredientsContainer: {
    marginTop: 8,
  },
  ingredientItem: {
    backgroundColor: COLORS.card,
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ingredientText: {
    ...TEXT_STYLES.body,
  },
});

export default React.memo(HoagieDetails);

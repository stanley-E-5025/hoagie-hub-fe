import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {TEXT_STYLES} from '../constants/styles';
import commonStyles from '../styles/common';

interface DetailScreenHeaderProps {
  title: string;
  onBack: () => void;
  onEdit?: () => void;
  canEdit?: boolean;
}

const DetailScreenHeader = ({
  title,
  onBack,
  onEdit,
  canEdit = false,
}: DetailScreenHeaderProps) => {
  const headerStyles = commonStyles.header();

  return (
    <View style={headerStyles.container}>
      <TouchableOpacity
        style={headerStyles.leftButton}
        onPress={onBack}
        accessibilityLabel="Go back"
        accessibilityRole="button">
        <Text style={headerStyles.leftButtonText}>← Back</Text>
      </TouchableOpacity>
      <Text style={headerStyles.title} accessibilityRole="header">
        {title}
      </Text>
      {canEdit && onEdit ? (
        <TouchableOpacity
          style={headerStyles.rightButton}
          onPress={onEdit}
          accessibilityLabel="Edit"
          accessibilityRole="button">
          <Text style={headerStyles.rightButtonText}>Edit</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    width: 40, // Match approximate width of edit button for balance
  },
});

export default React.memo(DetailScreenHeader);

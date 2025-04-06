import React, {ReactNode} from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {COLORS, TEXT_STYLES} from '../../constants/styles';

type CardProps = {
  children: ReactNode;
  title?: string;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  elevation?: boolean;
  padded?: boolean;
};

/**
 * Card Component
 *
 * A reusable card component with optional title and customizable styles
 */
const Card = ({
  children,
  title,
  style,
  contentStyle,
  headerStyle,
  elevation = false,
  padded = true,
}: CardProps) => {
  return (
    <View style={[styles.container, elevation && styles.elevation, style]}>
      {title && (
        <View style={[styles.header, headerStyle]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      <View
        style={[styles.content, padded && styles.paddedContent, contentStyle]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    marginVertical: 8,
    overflow: 'hidden',
  },
  header: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  title: {
    ...TEXT_STYLES.subtitle,
    marginBottom: 0,
  },
  content: {
    backgroundColor: COLORS.card,
  },
  paddedContent: {
    padding: 16,
  },
  elevation: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default Card;

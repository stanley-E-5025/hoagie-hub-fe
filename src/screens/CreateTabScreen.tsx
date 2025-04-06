import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import {useAppSelector} from '../store/hooks';
import {COLORS, TEXT_STYLES, LAYOUT} from '../constants/styles';
import CreateHoagieForm from '../components/CreateHoagieForm';
import {Card} from '../components/ui';

/**
 * CreateTabScreen Component
 *
 * Screen that allows users to create a new hoagie.
 * Uses the CreateHoagieForm component for form handling.
 */
const CreateTabScreen = () => {
  const {user} = useAppSelector(state => state.auth);

  if (!user) {
    return (
      <SafeAreaView style={LAYOUT.safeArea}>
        <View style={LAYOUT.center}>
          <Text style={styles.authMessage}>
            Please sign in to create a hoagie
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={LAYOUT.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={TEXT_STYLES.title}>Create a New Hoagie</Text>
          </View>

          <Card>
            <CreateHoagieForm userId={user._id} />
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 8,
  },
  authMessage: {
    ...TEXT_STYLES.body,
    color: COLORS.text.secondary,
    textAlign: 'center',
    padding: 16,
  },
});

export default CreateTabScreen;

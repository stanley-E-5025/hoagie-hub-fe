import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useAppSelector} from '../store/hooks';
import {logoutUser} from '../services/authService';
import {COLORS, TEXT_STYLES, LAYOUT, FORMS} from '../constants/styles';

const ProfileTabScreen = () => {
  const {user} = useAppSelector(state => state.auth);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => logoutUser(),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  if (!user) {
    return (
      <SafeAreaView style={LAYOUT.safeArea}>
        <View style={LAYOUT.center}>
          <Text style={TEXT_STYLES.subtitle}>Not logged in</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={LAYOUT.safeArea}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
        <Text style={TEXT_STYLES.title}>{user.name}</Text>
        <Text style={TEXT_STYLES.caption}>{user.email}</Text>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={[FORMS.button, styles.logoutButton]}
          onPress={handleLogout}>
          <Text style={FORMS.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    color: COLORS.card,
    fontWeight: 'bold',
  },
  logoutContainer: {
    padding: 16,
    marginTop: 'auto', // Push to bottom
  },
  logoutButton: {
    backgroundColor: COLORS.error,
  },
});

export default ProfileTabScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {User} from '../types';
import {COLORS, TEXT_STYLES, LAYOUT} from '../constants/styles';
import {useQuery} from '@tanstack/react-query';
import {searchUsers} from '../services/userApi';

type UserSearchListProps = {
  onSelectUser: (user: User) => void;
  excludeUserIds?: string[];
  minSearchLength?: number;
  selectedUserId?: string;
};

/**
 * UserSearchList Component
 *
 * A reusable component for searching and selecting users with debounced input
 */
const UserSearchList = ({
  onSelectUser,
  excludeUserIds = [],
  minSearchLength = 2,
  selectedUserId,
}: UserSearchListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Search users
  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users', 'search', debouncedQuery],
    queryFn: () => searchUsers(debouncedQuery),
    enabled: debouncedQuery.length >= minSearchLength,
  });

  // Filter out excluded users
  const filteredUsers =
    searchResults?.data.filter(user => !excludeUserIds.includes(user._id)) ||
    [];

  const renderUserItem = ({item}: {item: User}) => (
    <View style={styles.userItem}>
      <View style={styles.userAvatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.actionButton,
          selectedUserId === item._id && styles.selectedButton,
        ]}
        onPress={() => onSelectUser(item)}
        disabled={selectedUserId === item._id}>
        <Text style={styles.actionButtonText}>
          {selectedUserId === item._id ? 'Selected' : 'Select'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search users by name or email"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}>
              <Text>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isLoading ? (
        <View style={LAYOUT.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : error ? (
        <View style={LAYOUT.center}>
          <Text style={styles.errorText}>
            Error searching users: {(error as Error).message}
          </Text>
        </View>
      ) : debouncedQuery.length < minSearchLength ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            Type at least {minSearchLength} characters to search
          </Text>
        </View>
      ) : filteredUsers.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No users found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchInputContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  clearButton: {
    padding: 4,
  },
  listContainer: {
    padding: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
  },
  userAvatar: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    color: COLORS.card,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...TEXT_STYLES.body,
    fontWeight: 'bold',
  },
  userEmail: {
    ...TEXT_STYLES.small,
    color: COLORS.text.secondary,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  selectedButton: {
    backgroundColor: COLORS.text.secondary,
  },
  actionButtonText: {
    color: COLORS.card,
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    ...TEXT_STYLES.body,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  errorText: {
    ...TEXT_STYLES.body,
    color: COLORS.error,
    textAlign: 'center',
  },
});

export default UserSearchList;

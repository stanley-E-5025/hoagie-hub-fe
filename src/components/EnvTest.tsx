import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {API_URL} from '@env';

/**
 * EnvTest Component
 *
 * A simple component to verify that environment variables are working.
 * Can be removed after testing.
 */
const EnvTest = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Environment Variable Test</Text>
      <Text style={styles.value}>API URL: {API_URL}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
  },
});

export default EnvTest;

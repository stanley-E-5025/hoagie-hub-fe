import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {login, signUp} from '../services/authService';
import {TEXT_STYLES, LAYOUT, FORMS} from '../constants/styles';
import authStyles from '../styles/authStyles';

type AuthScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Auth'
>;

const AuthScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || (!isLogin && !name.trim())) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(email);
      } else {
        await signUp(email, name);
      }

      navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    } catch (error: any) {
      Alert.alert('Authentication Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={LAYOUT.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={authStyles.keyboardView}>
        <View style={authStyles.content}>
          <Text style={authStyles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
          <Text style={TEXT_STYLES.subtitle}>Welcome to Hoagie App</Text>

          <View style={authStyles.formContainer}>
            {!isLogin && (
              <TextInput
                style={[FORMS.input, authStyles.input]}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                editable={!loading}
              />
            )}

            <TextInput
              style={[FORMS.input, authStyles.input]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />

            <TouchableOpacity
              style={[
                FORMS.button,
                authStyles.button,
                loading && FORMS.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={FORMS.buttonText}>
                  {isLogin ? 'Login' : 'Sign Up'}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={authStyles.switchButton}
            onPress={() => setIsLogin(!isLogin)}
            disabled={loading}>
            <Text style={authStyles.switchText}>
              {isLogin
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthScreen;

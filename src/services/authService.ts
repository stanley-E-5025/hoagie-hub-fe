import {store} from '../store';
import {loginSuccess, logout} from '../store/authSlice';
import {findOrCreateUser, loginUser} from './userApi';
import {User} from '../types';

export const login = async (email: string): Promise<User> => {
  try {
    const user = await loginUser(email);
    store.dispatch(loginSuccess(user));
    return user;
  } catch (error: any) {
    console.error('Error during login:', error.message);
    throw error;
  }
};

export const signUp = async (email: string, name: string): Promise<User> => {
  try {
    const user = await findOrCreateUser(email, name);
    store.dispatch(loginSuccess(user));
    return user;
  } catch (error: any) {
    console.error('Error during signup:', error.message);
    throw error;
  }
};

export const logoutUser = (): void => {
  store.dispatch(logout());
};

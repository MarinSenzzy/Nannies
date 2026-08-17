import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { auth } from '../firebase/config';

export const registerUser = async (email: string, pass: string, name: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
  }
  return userCredential.user;
};

export const loginUser = async (email: string, pass: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  return userCredential.user;
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

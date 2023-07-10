// src/store/auth.js
import { defineStore } from 'pinia';
import { auth, db, googleProvider } from '../config';
import { ref } from 'vue';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const errorF = ref(null);

  const signUp = async (email, password, name) => {
    errorF.value = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;

      errorF.value = null;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      user.value = currentUser;

      const formCopy = { email, name, timestamp: serverTimestamp() };

      await setDoc(doc(db, 'users', currentUser.uid), formCopy);
    } catch (err) {
      user.value = null;
      errorF.value = err.message;
    }
  };

  const signIn = async (email, password) => {
    errorF.value = null;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;
      if (currentUser) {
        user.value = currentUser;
        errorF.value = null;
      }
    } catch (errorF) {
      user.value = null;
      errorF.value = errorF.message;
    }
  };

  const signOut = () => {
    auth.signOut();
    user.value = null;
  };

  const initializeAuth = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          user.value = currentUser;
        } else {
          user.value = null;
        }
      } catch (err) {
        user.value = null;
        console.errorF(err.message);
      }
    });
  };

  const signWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userData = result.user;
      user.value = userData;

      // check for user
      const docRef = doc(db, 'users', userData.uid);
      const docSnap = await getDoc(docRef);

      // if !user , create user
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: userData.displayName,
          email: userData.email,
          timestamp: serverTimestamp(),
        });
      }
    } catch (err) {
      alert(err.message);
    }

    // try {
    //   const result = await signInWithPopup(auth, googleProvider);
    //   user.value = result;
    // } catch (err) {
    //   console.log(err.message);
    // }
  };

  return {
    user,
    errorF,
    signUp,
    signIn,
    signOut,
    initializeAuth,
    signWithGoogle,
  };
});

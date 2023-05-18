// src/store/auth.js
import { defineStore } from "pinia";
import { auth, db } from "../config";
import { ref } from "vue";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const error = ref(null);

  const signUp = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;

      error.value = null;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      user.value = currentUser;

      const formCopy = { email, name, timestamp: serverTimestamp() };

      await setDoc(doc(db, "users", currentUser.uid), formCopy);
    } catch (err) {
      user.value = null;
      error.value = err.message;
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;
      if (currentUser) {
        user.value = currentUser;
        error.value = null;
      }
    } catch (error) {
      user.value = null;
      error.value = error.message;
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
        console.error(err.message);
      }
    });
  };

  return {
    user,
    error,
    signUp,
    signIn,
    signOut,
    initializeAuth,
  };
});

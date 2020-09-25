import * as firebase from 'firebase/app';
import 'firebase/auth';

import { firebaseConfig } from './firebaseConfig';

try {
  firebase.initializeApp(firebaseConfig)
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

export const firebaseApp = firebase;

export const signInWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  firebaseApp.auth().signInWithPopup(googleProvider);
};
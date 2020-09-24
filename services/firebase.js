import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

import { firebaseConfig } from './firebaseConfig';
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAppAuth = firebaseApp.auth();

export const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    }
  ],
};

export const loginUi = new firebaseui.auth.AuthUI(firebaseAppAuth);

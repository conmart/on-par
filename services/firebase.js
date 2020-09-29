import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { firebaseConfig } from './firebaseConfig';

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

export const firebaseApp = firebase;


// User Sign in
export const signInWithGoogle = async () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  await firebaseApp.auth().signInWithPopup(googleProvider);
};

export const signUserOut = async () => {
  await firebaseApp.auth().signOut();
};

const db = firebase.firestore();

const buildResourceList = (querySnapshot) => {
  const resourceList = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data['id'] = doc.id;
    resourceList.push(data);
  })
  return resourceList
}

// Courses
export const getAllCourses = async () => {
  const courses = await db.collection('courses').get();
  return buildResourceList(courses);
}

export const createNewCourse = async (newCourse) => {
  await db.collection('courses').add(newCourse);
};

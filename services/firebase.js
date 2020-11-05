import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { firebaseConfig } from './firebaseConfig';

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  // skip the "already exists" message which is
  // not an actual error when hot-reloading
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

export const db = firebase.firestore();

const buildResourceList = (querySnapshot) => {
  const resourceList = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data['id'] = doc.id;
    resourceList.push(data);
  });
  return resourceList;
};

// Courses
export const getAllCourses = async () => {
  const courses = await db.collection('courses').get();
  return buildResourceList(courses);
};

export const getSingleCourse = async (courseId) => {
  const course = await db.collection('courses').doc(courseId).get();
  return course.data();
};

export const getUserCourses = async (uid) => {
  const courses = await db
    .collection('courses')
    .where('author_id', '==', uid)
    .get();
  return buildResourceList(courses);
};

// Rounds
export const getSingleRound = async (roundId) => {
  const round = await db.collection('rounds').doc(roundId).get();
  return round.data();
};

export const getUserRounds = async (uid) => {
  const rounds = await db
    .collection('rounds')
    .where('user_id', '==', uid)
    .get();
  return buildResourceList(rounds);
};

export const updateScore = async (roundId, newData) => {
  await db.collection('rounds').doc(roundId).update(newData);
};

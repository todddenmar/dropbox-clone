// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCOdh0DWaGLY-yCrdpHri_YIXNz32uu7BI',
  authDomain: 'dropboxclone-c7952.firebaseapp.com',
  projectId: 'dropboxclone-c7952',
  storageBucket: 'dropboxclone-c7952.appspot.com',
  messagingSenderId: '228157277366',
  appId: '1:228157277366:web:f2035a268c3190c3abd217',
  measurementId: 'G-LBBHWWJX1S',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };

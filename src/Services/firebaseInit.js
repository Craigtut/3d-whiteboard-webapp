/* eslint-disable import/prefer-default-export */
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

import keys from '../keys.json';

const firebaseConfig = {
  apiKey: keys.firebaseAPIKey,
  authDomain: 'canvas-whiteboard-f877b.firebaseapp.com',
  databaseURL: 'https://canvas-whiteboard-f877b-default-rtdb.firebaseio.com',
  projectId: 'canvas-whiteboard-f877b',
  storageBucket: 'canvas-whiteboard-f877b.appspot.com',
  messagingSenderId: '756334470982',
  appId: '1:756334470982:web:87df707d66747ca4b22747',
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const storage = getStorage(app);

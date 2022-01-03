// All firebase database operations on boards node

import { useDatabaseSetMutation, useDatabaseValue } from '@react-query-firebase/database';
import { ref } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

import { database } from './firebaseInit';

export const useCreateNewBoard = () => {
  const uid = uuidv4();

  const dbRef = ref(database, `boards/${uid}`);
  const mutation = useDatabaseSetMutation(dbRef);

  return () => {
    mutation.mutate({
      uid,
      timeCreated: Date.now(),
    });
    return uid;
  };
};

export const useSubscribeToBoard = (boardUID) => {
  const dbRef = ref(database, `boards/${boardUID}`);

  const board = useDatabaseValue(['boards', boardUID], dbRef, {
    subscribe: true,
  });

  return board.data;
};

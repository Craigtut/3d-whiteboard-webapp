import { useDatabaseSetMutation, useDatabaseRemoveMutation } from '@react-query-firebase/database';
import { ref } from 'firebase/database';
import { ref as storRef, uploadBytes, getDownloadURL } from 'firebase/storage';

import { v4 as uuidv4 } from 'uuid';

import { database, storage } from './firebaseInit';

// 'file' can be from the Blob or File API & return downloadURL
export const uploadFile = async (file) => {
  const uid = uuidv4();

  const storageRef = storRef(storage, `media/${uid}`);
  const result = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(result.ref);

  // strips out undefined values
  const { metadata } = result;
  Object.keys(metadata).forEach((key) => (metadata[key] === undefined ? delete metadata[key] : {}));

  return { ...metadata, url };
};

export const useAddBoardObject = (boardUID) => {
  const uid = uuidv4();

  const dbRef = ref(database, `boards/${boardUID}/boardObjects/${uid}`);
  const mutation = useDatabaseSetMutation(dbRef);

  return (boardObject) => {
    mutation.mutate({
      uid,
      ...boardObject,
    });
  };
};

export const useUpdateBoardObject = (boardUID, objectUID) => {
  const dbRef = ref(database, `boards/${boardUID}/boardObjects/${objectUID}`);
  const mutation = useDatabaseSetMutation(dbRef);

  return (boardObject) => {
    mutation.mutate(boardObject);
  };
};

export const useDeleteBoardObject = (boardUID, objectUID) => {
  const dbRef = ref(database, `boards/${boardUID}/boardObjects/${objectUID}`);
  const mutation = useDatabaseRemoveMutation(dbRef);

  return () => {
    mutation.mutate();
  };
};

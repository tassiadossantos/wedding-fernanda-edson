import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

const COLLECTION = 'guestbook';

export async function addGuestbookEntry(
  name: string,
  message: string
): Promise<void> {
  await addDoc(collection(db, COLLECTION), {
    name,
    message,
    timestamp: serverTimestamp(),
  });
}

export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  const q = query(collection(db, COLLECTION), orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    message: doc.data().message,
    timestamp: doc.data().timestamp?.toDate() ?? new Date(),
  }));
}

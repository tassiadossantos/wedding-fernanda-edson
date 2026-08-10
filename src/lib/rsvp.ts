import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface RSVPEntry {
  id: string;
  name: string;
  attending: 'yes' | 'no';
  guestCount: number;
  dietaryRestrictions: string;
  message: string;
  timestamp: Date;
}

const COLLECTION = 'rsvp';

export async function addRSVPEntry(
  name: string,
  attending: 'yes' | 'no',
  guestCount: number,
  dietaryRestrictions: string,
  message: string
): Promise<void> {
  await addDoc(collection(db, COLLECTION), {
    name,
    attending,
    guestCount,
    dietaryRestrictions,
    message,
    timestamp: serverTimestamp(),
  });
}

export async function getRSVPEntries(): Promise<RSVPEntry[]> {
  const q = query(collection(db, COLLECTION), orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    attending: doc.data().attending,
    guestCount: doc.data().guestCount,
    dietaryRestrictions: doc.data().dietaryRestrictions,
    message: doc.data().message,
    timestamp: doc.data().timestamp?.toDate() ?? new Date(),
  }));
}

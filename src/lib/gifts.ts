import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { GiftReservation } from '../types';

const COLLECTION = 'gift_reservations';

export async function reserveGift(
  giftId: string,
  guestName: string
): Promise<void> {
  const existing = await getReservationsByGift(giftId);
  if (existing.length > 0) {
    throw new Error('Este presente já foi reservado por outro convidado.');
  }

  await addDoc(collection(db, COLLECTION), {
    giftId,
    guestName,
    timestamp: serverTimestamp(),
  });
}

export async function getReservations(): Promise<GiftReservation[]> {
  const q = query(collection(db, COLLECTION), orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    giftId: doc.data().giftId,
    guestName: doc.data().guestName,
    timestamp: doc.data().timestamp?.toDate() ?? new Date(),
  }));
}

export async function getReservationsByGift(
  giftId: string
): Promise<GiftReservation[]> {
  const q = query(
    collection(db, COLLECTION),
    where('giftId', '==', giftId)
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    giftId: doc.data().giftId,
    guestName: doc.data().guestName,
    timestamp: doc.data().timestamp?.toDate() ?? new Date(),
  }));
}

export async function getReservedGiftIds(): Promise<Set<string>> {
  const reservations = await getReservations();
  return new Set(reservations.map((r) => r.giftId));
}

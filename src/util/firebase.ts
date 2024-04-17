import { initializeApp } from "firebase/app";
import { getDatabase, increment, ref, update } from "firebase/database";

export type UserData = {
  counter: number;
  progress: number;
  currency: number;
  events?: Record<string, number | boolean>;
};

export type GlobalData = {
  counter: number;
  spin: number;
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export const globalRef = ref(db, "global");
const incr = (val: number) =>
  increment(process.env.NODE_ENV === "development" ? 0 : val);

export const increaseCounter = async (userId: string, val: number) => {
  const updates = {} as Record<string, number | object>;
  updates["global/counter"] = incr(100);
  updates[`users/${userId}/counter`] = incr(1);
  updates[`users/${userId}/progress`] = incr(val);
  updates[`users/${userId}/currency`] = incr(1);
  await update(ref(db), updates);
};

export const incrementCurrency = async (userId: string, val: number) => {
  const updates = {} as Record<string, number | object>;
  updates[`users/${userId}/currency`] = increment(val);
  if (val > 0) updates[`users/${userId}/stats/spent`] = increment(val);
  await update(ref(db), updates);
};

export const triggerEvent = async (
  userId: string,
  event: string,
  duration?: number
) => {
  // TODO: Figure out how duration should work
  // This would require more events to be planned
  const updateKey = `users/${userId}/events/${event}`;
  const updates = {} as Record<string, number | boolean>;
  updates[updateKey] = duration
    ? Math.floor(new Date().getTime() / 1000) + duration
    : true;
  await update(ref(db), updates);
};

export const addSpin = async () => {
  const updates = {} as Record<string, number | object>;
  updates["global/spin"] = increment(1);
  await update(ref(db), updates);
};

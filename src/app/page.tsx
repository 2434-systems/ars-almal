"use client";
import Image from "next/image";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, increment, onValue } from "firebase/database";
import { useEffect, useState } from "react";

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
const db = getDatabase(app);

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [pulse, setPulse] = useState(false);
  const handleAnimationEnd = () => setPulse(false);
  const triggerPulse = () => setPulse(true);

  const onClick = async () => {
    triggerPulse();
    await set(ref(db, "global"), {
      counter: increment(1),
    });
  };
  const globalData = ref(db, "global");
  useEffect(() => {
    onValue(globalData, (snapshot) => {
      const count = snapshot.val().counter;
      setCounter(count);
    });
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <div>
        <h1 className="text-black pb-8 text-3xl">ars almal</h1>
      </div>
      <div
        className={`relative flex place-items-center ${
          pulse ? "animate-clicky" : ""
        }`}
        onClick={onClick}
        onAnimationEnd={handleAnimationEnd}
      >
        <Image
          className="relative rounded-full drop-shadow-2xl hover:scale-110 transition-transform duration-200 ease-in-out hover:cursor-pointer"
          src="/ars.png"
          alt="Big Head"
          width={300}
          height={300}
          priority
        />
      </div>
      <div>
        <h2 className="text-black pt-8">her head is now {counter}cm wide</h2>
      </div>
    </main>
  );
}

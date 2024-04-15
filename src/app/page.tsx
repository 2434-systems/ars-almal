"use client";
import Image from "next/image";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, increment, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { Switch } from "@radix-ui/themes";
import { v4 as uuid } from "uuid";

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
  const [isJP, setIsJP] = useState(false);
  const handleAnimationEnd = () => setPulse(false);
  const triggerPulse = () => setPulse(true);

  const onClick = async () => {
    triggerPulse();
    await set(ref(db, "global"), {
      counter: increment(1),
    });
    await set(ref(db, "users/" + localStorage.getItem("userId")), {
      counter: increment(1),
    });
  };
  const onCheckedChange = (checked: boolean) => setIsJP(checked);
  const globalData = ref(db, "global");
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      localStorage.setItem("userId", uuid());
    }
    onValue(globalData, (snapshot) => {
      const count = snapshot.val().counter;
      setCounter(count);
    });
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-100">
      <div className="absolute top-4 right-4">
        <Switch
          size="3"
          className="hover:cursor-pointer"
          onCheckedChange={onCheckedChange}
        />
        {isJP ? " JP" : " EN"}
      </div>
      <div className="w-full">
        <h1
          className={`text-black pb-8 text-center ${
            isJP ? "text-[3.3vw]" : "text-[5vw]"
          } sm:text-3xl font-bold`}
        >
          {isJP ? "アルス・アルマル" : "ars almal"}
        </h1>
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
          width={counter / 1000 + 300}
          height={counter / 1000 + 300}
          priority
        />
      </div>
      <div className="flex w-full flex-row justify-center">
        <div className="w-full text-black pt-8 text-center text-[3.5vw] sm:text-xl">
          {isJP ? (
            <h2>
              頭の幅が
              <span className="text-blue-400 font-bold">{counter / 100}m</span>
              になった
            </h2>
          ) : (
            <h2>
              her head is now{" "}
              <span className="text-blue-400 font-bold">{counter / 100}m</span>{" "}
              wide
            </h2>
          )}
        </div>
      </div>
    </main>
  );
}

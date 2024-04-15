"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, increment, onValue } from "firebase/database";

import { Flex, IconButton, Switch, Table, Text } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import { QuestionMarkIcon, Cross2Icon } from "@radix-ui/react-icons";

import { v4 as uuid } from "uuid";
import useSound from "use-sound";

type UserData = {
  counter: number;
  progress: number;
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

const files = [
  "gushi",
  "ausaumau1",
  "ausaumau2",
  "laugh1",
  "tasukete",
  "hentai",
  "mad",
];

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [userData, setUserData] = useState({} as UserData);
  const [pulse, setPulse] = useState(false);
  const [isJP, setIsJP] = useState(false);
  const handleAnimationEnd = () => setPulse(false);
  const triggerPulse = () => setPulse(true);

  const [play] = useSound(
    `/audio/${files[Math.floor(Math.random() * files.length)]}.mp3`,
    { volume: 0.5 }
  );

  const onClick = async () => {
    triggerPulse();
    play();
    await set(ref(db, "global"), {
      counter: increment(100),
    });
    await set(ref(db, "users/" + localStorage.getItem("userId")), {
      counter: increment(1),
      progress: increment(100),
    });
  };
  const onCheckedChange = (checked: boolean) => setIsJP(checked);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      localStorage.setItem("userId", uuid());
    }
    const globalData = ref(db, "global");
    const userData = ref(db, "users/" + localStorage.getItem("userId"));
    onValue(globalData, (snapshot) => {
      const count = snapshot.val().counter;
      setCounter(count);
    });
    onValue(userData, (snapshot) => {
      const data = snapshot.val() as UserData;
      setUserData(data);
    });
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-100">
      <div className="absolute top-3 right-24">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <IconButton
              className="hover:cursor-pointer items-center justify-center"
              variant="outline"
            >
              <QuestionMarkIcon />
            </IconButton>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA data-[state=open]:animate-overlayShow fixed inset-0" />

            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                {isJP ? "情報" : "Information"}
              </Dialog.Title>
              <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                {isJP ? (
                  <span>
                    <a
                      href="https://www.youtube.com/@ArsAlmal"
                      className="text-blue-400"
                    >
                      アルス・アルマル
                    </a>{" "}
                    はにじさんじ所属のバーチャルYouTuberです。とてもかわいい小さな頭を持っていますが、どれくらい大きくなるのでしょうか?
                  </span>
                ) : (
                  <span>
                    <a
                      href="https://www.youtube.com/@ArsAlmal"
                      className="text-blue-400"
                    >
                      Ars Almal
                    </a>{" "}
                    is a Virtual Youtuber affiliated with Nijisanji. She has a
                    very cute and tiny face. But how big can she go?
                  </span>
                )}
              </Dialog.Description>
              <div className="pb-4">
                <Table.Root size="2">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell>
                        {isJP ? "統計情報" : "Statistics"}
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>
                        {isJP ? "値" : "Value"}
                      </Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.RowHeaderCell>
                        {isJP ? "あなたのクリック数" : "Your clicks"}
                      </Table.RowHeaderCell>
                      <Table.Cell>{userData.counter || 0}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.RowHeaderCell>
                        {isJP ? "あなたのクリック数" : "Your progress"}
                      </Table.RowHeaderCell>
                      <Table.Cell>{(userData.progress || 0) / 100}m</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
              </div>

              {/* <div className="mt-[25px] flex justify-end">
                <Dialog.Close asChild>
                  <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                    Save changes
                  </button>
                </Dialog.Close>
              </div> */}
              <Flex direction="column" gap="3">
                <Text as="div" size="1" mb="1" weight="bold" color="gray">
                  Made with ❤️ by <a href="https://x.com/eightyzy">80</a>
                </Text>
              </Flex>
              <Dialog.Close asChild>
                <button
                  className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
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
              <span className="text-blue-400 font-bold">
                {(counter / 100000).toFixed(2)}km
              </span>
              になった
            </h2>
          ) : (
            <h2>
              her head is now{" "}
              <span className="text-blue-400 font-bold">
                {(counter / 100000).toFixed(2)}km
              </span>{" "}
              wide
            </h2>
          )}
        </div>
      </div>
    </main>
  );
}

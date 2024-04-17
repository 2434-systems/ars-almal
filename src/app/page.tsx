"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Switch, Tooltip } from "@radix-ui/themes";
import useSound from "use-sound";
import { onValue, ref } from "firebase/database";

import {
  addSpin,
  db,
  GlobalData,
  globalRef,
  increaseCounter,
  UserData,
} from "@/util/firebase";
import { getUserId } from "@/util/localStorage";
import { getAudioFile } from "@/util/sound";
import Shop from "./shop";
import Info from "./info";
import Ars from "./ars";
import MiniArs from "./mini";

export default function Home() {
  const [globalData, setGlobalData] = useState({
    counter: 0,
    spin: 0,
  } as GlobalData);
  const [userData, setUserData] = useState({
    counter: 0,
    progress: 0,
    currency: 0,
  } as UserData);
  const [isJP, setIsJP] = useState(false);

  const [play] = useSound(getAudioFile(), { volume: 0.5 });

  const handleClick = async () => {
    play();
    const userId = getUserId();
    await increaseCounter(userId, 1);
    if (userData.events) {
      const spinEvent = userData.events["spin"];
      if (typeof spinEvent === "number" && spinEvent > Date.now() / 1000) {
        await addSpin();
      }
    }
  };
  const onCheckedChange = (checked: boolean) => setIsJP(checked);

  useEffect(() => {
    const userId = getUserId();
    const userUnsub = onValue(ref(db, "users/" + userId), (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
    });
    const globalUnsub = onValue(globalRef, (snapshot) => {
      const data = snapshot.val();
      setGlobalData(data);
    });
    return () => {
      userUnsub();
      globalUnsub();
    };
  }, []);

  return (
    <main className="flex w-full h-screen flex-col items-center justify-center p-24 overflow-hidden">
      <div className="absolute top-4 left-4 z-1 flex flex-row w-1/4 justify-left gap-4 items-center">
        <Shop isJP={isJP} userData={userData} />
        <Info isJP={isJP} userData={userData} />
      </div>
      <div className="absolute top-6 right-6">
        <Tooltip
          content={isJP ? "言語を切り替える" : "Switch language"}
          side="bottom"
        >
          <Switch
            size="3"
            className="hover:cursor-pointer z-1"
            onCheckedChange={onCheckedChange}
            variant="soft"
          />
        </Tooltip>
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
      <Ars
        handleClick={handleClick}
        userData={userData}
        globalData={globalData}
      />
      <MiniArs globalData={globalData} />
      <div className="flex w-full flex-row justify-center">
        <div className="w-full text-black pt-8 text-center text-[3.5vw] sm:text-xl">
          <h2>
            {isJP ? "頭の幅が" : "her head is now "}
            <span className="text-blue-400 font-bold">
              {(globalData.counter / 100000).toFixed(3)}km
            </span>
            {isJP ? "になった" : " wide"}
          </h2>
        </div>
      </div>
    </main>
  );
}

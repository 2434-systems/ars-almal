"use client";
import Image from "next/image";
import { motion, useAnimate } from "framer-motion";
import { GlobalData, UserData } from "@/util/firebase";
import { useState } from "react";

export default function Ars({
  handleClick,
  userData,
  globalData,
}: {
  handleClick: () => Promise<void>;
  userData: UserData;
  globalData: GlobalData;
}) {
  const [scope, animate] = useAnimate();
  const [cooldown, setCooldown] = useState(false);
  const onClick = async () => {
    if (cooldown) return;
    setCooldown(true);
    await handleClick();
    setCooldown(false);
  };
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      onTap={() => {
        animate(scope.current, {
          scale: [1, 1.1, 1, 1, 1],
          transition: { duration: 0.1 },
        });
      }}
      whileInView={{ rotate: `${globalData.spin % 360}deg` }}
    >
      <Image
        className={`relative rounded-full drop-shadow-2xl hover:cursor-pointer`}
        src="/ars.png"
        alt="Big Face"
        width={globalData.counter / 10000 + 300}
        height={globalData.counter / 10000 + 300}
        priority
        ref={scope}
        onClick={onClick}
      />
    </motion.div>
  );
}

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FallingImage, generateFallingArs } from "@/util/falling";
import { GlobalData } from "@/util/firebase";

export default function MiniArs({ globalData }: { globalData: GlobalData }) {
  const [fallingImgs, setFallingImgs] = useState([] as FallingImage[]);
  const handleFallingEnd = (id: number) =>
    setFallingImgs((prevImages) => prevImages.filter((img) => img.id !== id));

  useEffect(() => {
    const spawnFalling = () => {
      const newImage = generateFallingArs();
      setFallingImgs((prevImages: FallingImage[]) => [
        newImage,
        ...prevImages.slice(0, 9),
      ]);
    };
    spawnFalling();
  }, [globalData]);

  // keyframes: {
  //   "fall-and-fade-left": {
  //     "0%": { transform: "translate(-50%, 0) rotate(0)", opacity: "1" },
  //     "90%": { opacity: "1" },
  //     "100%": {
  //       transform: "translate(-75%, 100vh) rotate(-30deg)",
  //       opacity: "0",
  //     },
  //   },
  //   "fall-and-fade-right": {
  //     "0%": { transform: "translate(-50%, 0) rotate(0)", opacity: "1" },
  //     "90%": { opacity: "1" },
  //     "100%": {
  //       transform: "translate(-25%, 100vh) rotate(30deg)",
  //       opacity: "0",
  //     },
  //   },
  // },
  // animation: {
  //   "fall-left": "fall-and-fade-left 4s linear forwards",
  //   "fall-right": "fall-and-fade-right 4s linear forwards",
  // },

  return fallingImgs.map((img: FallingImage) => (
    <motion.div
      key={img.id}
      animate={{
        y: "100vh",
        rotate: img.randomSway === "right" ? 30 : -30,
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 4,
        ease: "linear",
      }}
      style={{
        position: "absolute",
        top: "-100px",
        left: `${img.randomX}%`,
        transform: "translateX(-50%)",
        zIndex: -1,
      }}
      onAnimationComplete={() => handleFallingEnd(img.id)}
    >
      <Image
        src="/ars.png"
        width={50}
        height={50}
        style={{
          width: `${img.randomSize}vw`,
        }}
        alt="Falling Ars"
      />
    </motion.div>
  ));
}

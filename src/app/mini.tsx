import Image from "next/image";
import { useEffect, useState } from "react";
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

  return fallingImgs.map((img: FallingImage) => (
    <Image
      key={img.id}
      src="/ars.png"
      width={50}
      height={50}
      className={`absolute ${
        img.randomSway === "right" ? "animate-fall-right" : "animate-fall-left"
      }`}
      style={{
        top: "-100px",
        left: `${img.randomX}%`,
        transform: "translateX(-50%)",
        width: `${img.randomSize}vw`,
        zIndex: -1,
      }}
      alt="Falling Ars"
      onAnimationEnd={() => handleFallingEnd(img.id)}
    />
  ));
}

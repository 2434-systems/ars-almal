export type PlayerEvent = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  price: number;
  duration?: number;
};

export const playerEvents: Record<string, PlayerEvent> = {
  spin: {
    id: "spin",
    name: "Spin the Ars",
    description: "Each click rotates Ars",
    enabled: true,
    price: 200,
    duration: 300,
  },
  newOutfit: {
    id: "newOutfit",
    name: "New Outfit",
    description: "Dress Ars up",
    enabled: false,
    price: 100,
  },
  gacha: {
    id: "gacha",
    name: "NijiGacha",
    description: "Roll for your oshis",
    enabled: false,
    price: 1000,
  },
};

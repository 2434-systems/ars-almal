const files = [
  "gushi",
  "ausaumau1",
  "ausaumau2",
  "laugh1",
  "tasukete",
  "hentai",
  "mad",
];

export const getAudioFile = () =>
  `/audio/${files[Math.floor(Math.random() * files.length)]}.mp3`;

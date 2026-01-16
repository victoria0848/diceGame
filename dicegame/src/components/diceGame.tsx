import { useState, useRef } from "react";
import { Dice } from "./dice";
import { Controls } from "./controls";
import volumeOn from "../assets/volume-on.png";
import volumeOff from "../assets/volume-off.png";
import batBg from "../assets/bat-bg.png"; // baggrundsbillede
import styles from "./diceGame.module.scss";

export const DiceGame = () => {
  const [dice, setDice] = useState<number>(rollDice());
  const [result, setResult] = useState("");
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    return localStorage.getItem("muted") === "true";
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function startSound() {
    if (!audioRef.current) {
      audioRef.current = new Audio("/bat-sound.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = isMuted ? 0 : 0.3;
      audioRef.current.play().catch(() => {});
    }
  }

  function fadeVolume(target: number) {
    if (!audioRef.current) return;

    const step = target > audioRef.current.volume ? 0.02 : -0.02;

    const interval = setInterval(() => {
      if (!audioRef.current) return;

      audioRef.current.volume = Math.max(
        0,
        Math.min(1, audioRef.current.volume + step)
      );

      if (
        (step > 0 && audioRef.current.volume >= target) ||
        (step < 0 && audioRef.current.volume <= target)
      ) {
        clearInterval(interval);
      }
    }, 30);
  }

  function toggleMute() {
    if (!audioRef.current) return;

    if (isMuted) {
      fadeVolume(0.3);
      localStorage.setItem("muted", "false");
    } else {
      fadeVolume(0);
      localStorage.setItem("muted", "true");
    }

    setIsMuted(!isMuted);
  }

  function handleGuess(type: "higher" | "lower") {
    startSound();

    const newDice = rollDice();

    setResult(
      (type === "higher" && newDice > dice) ||
        (type === "lower" && newDice < dice)
        ? "Rigtigt gæt!"
        : "Forkert gæt!"
    );

    setDice(newDice);
  }

  return (
    <div className={styles.container}>
      {/* Øverste højre mute-knap */}
      <button className={styles.mute} onClick={toggleMute}>
        <img src={isMuted ? volumeOff : volumeOn} alt="Toggle sound" />
      </button>

      {/* H1 
      <h1 className={styles.title}>🦇 Dice Game</h1> */}

      <section className={styles.game}>
        {/* Baggrundsbillede */}
        <img src={batBg} className={styles.bg} alt="Baggrund" />

        <Dice value={dice} />

        <Controls onGuess={handleGuess} />

        {result && <p className={styles.result}>{result}</p>}
      </section>
    </div>
  );
};
import { useState, useRef } from "react";
import { Dice } from "./dice";
import { Controls } from "./controls";
import styles from "./diceGame.module.scss";

export const DiceGame = () => {
  const [dice, setDice] = useState<number>(rollDice());
  const [result, setResult] = useState<string>("");

  const bgSound = useRef<HTMLAudioElement | null>(null);

  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function startSound() {
    if (!bgSound.current) {
      bgSound.current = new Audio("/bat-sound.mp3");
      bgSound.current.loop = true;
      bgSound.current.volume = 0.3;
      bgSound.current.play();
    }
  }

  function handleGuess(type: "higher" | "lower") {
    startSound(); // user interaction unlocks sound

    const newDice = rollDice();

    if (
      (type === "higher" && newDice > dice) ||
      (type === "lower" && newDice < dice)
    ) {
      setResult("Rigtigt gæt!");
    } else {
      setResult("Forkert gæt!");
    }

    setDice(newDice);
  }

  return (
    <section className={styles.game}>
      <h1>🦇 Dice Game</h1>

      <Dice value={dice} />

      <Controls onGuess={handleGuess} />

      {result && <p className={styles.result}>{result}</p>}
    </section>
  );
};
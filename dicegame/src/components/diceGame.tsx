import { useState } from "react";
import { Dice } from "./dice";
import { Controls } from "./controls";
import styles from "./DiceGame.module.scss";

export const DiceGame = () => {
  const [dice, setDice] = useState<number>(rollDice());
  const [result, setResult] = useState<string>("");

  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function handleGuess(type: "higher" | "lower") {
    const newDice = rollDice();

    if (
      (type === "higher" && newDice > dice) ||
      (type === "lower" && newDice < dice)
    ) {
      setResult("Rigtigt!");
    } else {
      setResult("Forkert!");
    }

    setDice(newDice);
  }

  return (
    <section className={styles.game}>
      <h1>🎲 højere eller lavere</h1>

      <Dice value={dice} />

      <Controls onGuess={handleGuess} />

      {result && <p className={styles.result}>{result}</p>}
    </section>
  );
};
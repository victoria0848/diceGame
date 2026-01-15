import styles from "./DiceGame.module.scss";
 
type Props = {
  onGuess: (type: "higher" | "lower") => void;
};
 
export const Controls = ({ onGuess }: Props) => {
  return (
    <div className={styles.buttons}>
      <button onClick={() => onGuess("higher")}>Højere</button>
      <button onClick={() => onGuess("lower")}>Lavere</button>
    </div>
  );
}
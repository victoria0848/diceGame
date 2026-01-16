import styles from "./diceGame.module.scss";

type Props = {
  value: number;
};

export const Dice = ({ value }: Props) => {
  return <div className={styles.dice}>{value}</div>;
};
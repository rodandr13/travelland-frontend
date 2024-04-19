import styles from "./styles.module.scss";

interface Props {
  description: string;
}

export const Description = ({ description }: Props) => {
  return (
    <section className={styles.description}>
      <h3 className={styles.description__title}>Что вас ждет на экскурсии?</h3>
      <p className={styles.description__description}>{description}</p>
    </section>
  );
};

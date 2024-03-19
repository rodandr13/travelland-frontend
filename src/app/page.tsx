import styles from "./page.module.scss";

export default function Home() {
  console.log("test");
  return (
    <main className={styles.main}>
      <h1>Main text</h1>
    </main>
  );
}

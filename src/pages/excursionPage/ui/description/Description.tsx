import styles from "./styles.module.scss";

export const Description = () => {
  return (
    <section className={styles.description}>
      <h3 className={styles.description__title}>What awaits you?</h3>
      <p className={styles.description__description}>
        Do you want to immerse yourself in the romance of the Middle Ages, feel
        the breath of that time and walk along those same narrow streets? This
        is possible on our field trip “Czech Krumlov and Hluboká nad Vltavou
        Castle”. The sights, as well as the stories and legends from our guide,
        will not leave you. Cesky Krumlov is a preserved piece of the Middle
        Ages, it looks like a picture from a fairy tale book. Buildings in the
        Gothic, Baroque and Renaissance styles are mixed here, and the streets
        are narrower and more winding than in Prague. The city has been
        preserved almost unchanged, and that is why it is now considered an
        important part of the cultural heritage and is under the protection of
        UNESCO.
      </p>
    </section>
  );
};

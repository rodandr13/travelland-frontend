import styles from "./styles.module.scss";
import Image from "next/image";

export const Gallery = () => {
  return (
    <section className={styles.gallery}>
      <div className={styles.gallery__item}>
        <Image
          className={styles.gallery__image}
          fill={true}
          src="/img1.jpg"
          alt=""
        />
      </div>
      <div className={styles.gallery__item}>
        <Image
          className={styles.gallery__image}
          fill={true}
          src="/img2.jpg"
          alt=""
        />
      </div>
      <div className={styles.gallery__item}>
        <Image
          className={styles.gallery__image}
          fill={true}
          src="/img3.jpg"
          alt=""
        />
      </div>
      <div className={styles.gallery__item}>
        <Image
          className={styles.gallery__image}
          fill={true}
          src="/img4.jpg"
          alt=""
        />
      </div>
      <div className={styles.gallery__item}>
        <Image
          className={styles.gallery__image}
          fill={true}
          src="/img5.jpg"
          alt=""
        />
      </div>
    </section>
  );
};

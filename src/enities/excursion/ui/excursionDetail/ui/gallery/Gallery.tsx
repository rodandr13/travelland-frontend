import styles from "./styles.module.scss";
import Image from "next/image";
import { urlFor } from "@/src/shared/lib/sanity/client";

interface Props {
  images: string[];
}

export const Gallery = ({ images }: Props) => {
  return (
    <section className={styles.gallery}>
      {images.map((image, i) => (
        <div key={i} className={styles.gallery__item}>
          <Image
            className={styles.gallery__image}
            fill={true}
            src={urlFor(image)}
            alt=""
          />
        </div>
      ))}
    </section>
  );
};

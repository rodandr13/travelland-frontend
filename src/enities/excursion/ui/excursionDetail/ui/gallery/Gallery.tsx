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
            fill
            src={urlFor(image, { width: i === 0 ? 850 : 450 })}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            sizes={
              i === 0
                ? "(max-width: 500px) 50vw, (max-width: 800px) 33vw, (max-width: 1200px) 50vw"
                : "(max-width: 400px) 12vw, (max-width: 500px) 18vw, (max-width: 1300px) 15vw"
            }
          />
        </div>
      ))}
    </section>
  );
};

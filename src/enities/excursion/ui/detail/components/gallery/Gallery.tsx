import Image from "next/image";

import { GalleryImage } from "@/src/enities/excursion/model/types/ExcursionDetail";
import { urlFor } from "@/src/shared/lib/sanity/client";

import styles from "./styles.module.scss";

interface Props {
  images: GalleryImage[];
}

export const Gallery = ({ images }: Props) => {
  return (
    <section className={styles.gallery}>
      {images.map((image, i) => (
        <div key={i} className={styles.gallery__item}>
          <Image
            className={styles.gallery__image}
            fill
            src={urlFor(image.src)}
            alt=""
            placeholder="blur"
            loading="eager"
            blurDataURL={image.lqip}
            quality={60}
            sizes={
              i === 0
                ? "(max-width: 500px) 70vw, (max-width: 800px) 50vw, (max-width: 1200px) 35vw, 33vw"
                : "(max-width: 400px) 20vw, (max-width: 500px) 25vw, (max-width: 1300px) 20vw, 20vw"
            }
          />
        </div>
      ))}
    </section>
  );
};

import Image from "next/image";

import { urlFor } from "@/src/shared/lib/sanity/client";
import { Category, Subcategory } from "@/src/shared/types/excursion";

import styles from "./styles.module.scss";

interface Props {
  category: Category;
  subCategory: Subcategory[];
}

export const Categories = ({ category, subCategory }: Props) => {
  const categories = [category, ...subCategory];
  return (
    <section className={styles.categories}>
      <ul className={styles.categories__list}>
        {categories.map((category, index) => (
          <li key={index} className={styles.categories__item}>
            <div className={styles.categories__imageContainer}>
              <Image
                className={styles.categories__image}
                src={urlFor(category.icon)}
                alt=""
                fill
              />
            </div>
            <span className={styles.categories__title}>{category.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

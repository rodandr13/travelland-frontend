import styles from "./styles.module.scss";

import { Category, Subcategory } from "@/src/shared/types/excursion";

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
            <span className={styles.categories__title}>{category.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

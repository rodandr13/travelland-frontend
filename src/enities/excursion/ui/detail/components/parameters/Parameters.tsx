import Image from "next/image";

import { urlFor } from "@/src/shared/lib/sanity/client";
import { Parameter } from "@/src/shared/types/excursion";

import styles from "./styles.module.scss";

interface Props {
  parameters: Parameter[];
}

export const Parameters = ({ parameters }: Props) => {
  return (
    <section className={styles.parameters}>
      <ul className={styles.parameters__list}>
        {parameters.map((parameter, index) => (
          <li key={index} className={styles.parameters__item}>
            <div className={styles.parameters__imageContainer}>
              <Image
                src={urlFor(parameter.icon)}
                alt=""
                fill
                className={styles.parameters__image}
              />
            </div>
            <div>
              <h3 className={styles.parameters__title}>{parameter.title}</h3>
              <p className={styles.parameters__value}>{parameter.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

"use client";

import { useState } from "react";

import clsx from "clsx";
import Select from "react-select";

import styles from "./styles.module.scss";

import { Button } from "@/src/shared/ui/button";

interface Props {
  title: string;
}

export const Search = ({ title }: Props) => {
  const options = [{ value: "prague", label: "Прага" }];
  const [activeItem, setActiveItem] = useState<string | null>("excursions");

  const handleClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <section className={styles.search}>
      <h1 className={styles.search__title}>{title}</h1>
      <div className={styles.search__services}>
        <ul className={styles.search__list}>
          <li className={styles.search__item}>
            <span
              onClick={() => handleClick("excursions")}
              className={clsx(
                styles.search__itemValue,
                activeItem === "excursions" && styles.search__itemValue_active
              )}
            >
              Экскурсии
            </span>
          </li>
          <li className={styles.search__item}>
            <span
              onClick={() => handleClick("transfers")}
              className={clsx(
                styles.search__itemValue,
                activeItem === "transfers" && styles.search__itemValue_active
              )}
            >
              Трансферы
            </span>
          </li>
          <li className={styles.search__item}>
            <span
              onClick={() => handleClick("tours")}
              className={clsx(
                styles.search__itemValue,
                activeItem === "tours" && styles.search__itemValue_active
              )}
            >
              Туры
            </span>
          </li>
        </ul>
      </div>
      <div className={styles.search__selectContainer}>
        <span className={styles.search__caption}>Где</span>
        <Select
          options={options}
          placeholder=""
          isSearchable
          instanceId="test"
          isDisabled
        />
      </div>
      <div className={styles.search__buttonContainer}>
        <Button title="Найти" color="green" disabled />
      </div>
    </section>
  );
};

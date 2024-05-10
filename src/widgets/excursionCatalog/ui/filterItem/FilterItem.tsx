"use client";

import React from "react";

import Image from "next/image";

import { useAppDispatch } from "@/src/shared/lib/redux/hooks";
import { urlFor } from "@/src/shared/lib/sanity/client";

import styles from "./styles.module.scss";
import { setFilter } from "../../model/filterSlice";
import { IFilterItem } from "../../model/types/FiltersType";

interface Props {
  filter: IFilterItem;
}

export const FilterItem = ({ filter }: Props) => {
  const imageUrl = urlFor(filter.icon);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className={styles.filterItem}>
      <input
        className={styles.filterItem__input}
        id={filter._id}
        type="radio"
        name="filterGroup"
        value={filter.title}
        onChange={handleChange}
      />
      <label htmlFor={filter._id} className={styles.filterItem__label}>
        <div className={styles.filterItem__imageContainer}>
          <Image
            className={styles.filterItem__image}
            src={imageUrl}
            alt=""
            fill
          />
        </div>
        <span className={styles.filterItem__caption}>{filter.title}</span>
      </label>
    </div>
  );
};

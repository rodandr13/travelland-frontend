"use client";

import React from "react";

import { Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";

import { urlFor } from "@/src/shared/lib/sanity/client";
import { RouteItem } from "@/src/shared/types/excursion";

import styles from "./styles.module.scss";

type position = "START" | "END" | "POINT";

interface Props {
  place: RouteItem;
  position: position;
  isOpen?: boolean;
}

export const RoutePoint = ({ position, place, isOpen }: Props) => {
  const [opened, { toggle }] = useDisclosure(isOpen);
  const startTitle = position === "START" && "Место сбора";
  const endTitle = position === "END" && "Место завершения экскурсии";
  const placeTitle = place.title || startTitle || endTitle;

  return (
    <section className={styles.routePoint}>
      <div className={styles.routePoint__container}>
        <h3 className={styles.routePoint__subheader} onClick={toggle}>
          <span>{placeTitle}</span>
        </h3>
        <Collapse in={opened}>
          <div className={styles.routePoint__collapse}>
            <div className={styles.routePoint__descriptionContainer}>
              <p className={styles.routePoint__description}>
                {place.description}
              </p>
              {position === "START" && (
                <p className={styles.routePoint__caption}>
                  На месте сбора вас будет ждать наш представитель с табличкой
                  «iTRAVEX»
                </p>
              )}
            </div>
            <div className={styles.routePoint__gallery}>
              <div className={styles.routePoint__imageContainer}>
                {place.gallery.map((image, i) => (
                  <Image
                    key={i}
                    className={styles.routePoint__image}
                    src={urlFor(image.src)}
                    placeholder="blur"
                    blurDataURL={image.lqip}
                    sizes="10vw"
                    alt=""
                    fill
                  />
                ))}
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </section>
  );
};

import styles from "./styles.module.scss";
import Image from "next/image";
import { IMeetingPoint } from "@/src/enities/excursion/model/types/ExcursionDetail";
import { urlFor } from "@/src/shared/lib/sanity/client";

interface Props {
  meetingPlace: IMeetingPoint;
  isStart?: boolean;
}

export const MeetingPoint = ({ isStart, meetingPlace }: Props) => {
  return (
    <section className={styles.meetingPoint}>
      <div className={styles.meetingPoint__container}>
        <h3 className={styles.meetingPoint__subheader}>
          {isStart ? "Место сбора" : "Место завершения экскурсии"}
        </h3>
        <p className={styles.meetingPoint__description}>
          {meetingPlace.description}
        </p>
        {isStart && (
          <p className={styles.meetingPoint__caption}>
            На месте сбора вас будет ждать наш представитель с табличкой
            «iTRAVEX»
          </p>
        )}
      </div>
      <div className={styles.meetingPoint__gallery}>
        <div className={styles.meetingPoint__imageContainer}>
          <Image
            className={styles.meetingPoint__image}
            src={urlFor(meetingPlace.image.src)}
            placeholder="blur"
            blurDataURL={meetingPlace.image.lqip}
            sizes="(max-width: 500px) 70vw, (max-width: 768px) 50vw, (max-width: 1200px) 30vw, 20vw"
            alt=""
            fill
          />
        </div>
      </div>
    </section>
  );
};

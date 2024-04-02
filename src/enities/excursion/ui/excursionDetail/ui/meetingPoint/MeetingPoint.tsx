import styles from "./styles.module.scss";
import Image from "next/image";
import { IMeetingPoint } from "@/src/enities/excursion/model/types/ExcursionDetail";

interface Props {
  meetingPoint: IMeetingPoint;
}

export const MeetingPoint = ({ meetingPoint }: Props) => {
  return (
    <section className={styles.meetingPoint}>
      <div className={styles.meetingPoint__container}>
        <h3 className={styles.meetingPoint__title}>Место встречи</h3>
        <p className={styles.meetingPoint__description}>
          {meetingPoint.description}
        </p>
      </div>
      <div className={styles.meetingPoint__imageContainer}>
        <Image
          className={styles.meetingPoint__image}
          src="/map.jpg"
          fill
          alt=""
        />
      </div>
    </section>
  );
};

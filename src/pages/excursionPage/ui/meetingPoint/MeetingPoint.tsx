import styles from "./styles.module.scss";
import Image from "next/image";

export const MeetingPoint = () => {
  return (
    <section className={styles.meetingPoint}>
      <h3 className={styles.meetingPoint__title}>Место встречи</h3>
      <p className={styles.meetingPoint__description}>
        Станция мето Мустек, выход в сторону улиц Йиндржишска и Водичкова. Адрес
        места встречи: Vaclavske nam. 791/32,110 00 Praha. На месте сбора вас
        будет ждать наш представитель с табличкой «iTRAVEX».
      </p>
      <Image src="/map.jpg" width={310} height={110} alt="" />
    </section>
  );
};

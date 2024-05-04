import styles from "./styles.module.scss";
import { IMeetingPoint } from "@/src/enities/excursion/model/types/ExcursionDetail";
import { Map } from "@/src/shared/ui/";

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
      {meetingPoint.location && (
        <Map lat={meetingPoint.location.lat} lng={meetingPoint.location.lng} />
      )}
    </section>
  );
};

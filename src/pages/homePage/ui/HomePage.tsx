import styles from "./styles.module.scss";
import { SectionTitle } from "../../../shared/ui/sectionTitle";
import { ExcursionCatalog } from "@/src/widgets/excursionCatalog";

export const HomePage = () => {
  return (
    <main className={styles.home}>
      <SectionTitle>Экскурсии</SectionTitle>
      <ExcursionCatalog />
      <section className={styles.aboutUs}>
        <SectionTitle>О компании</SectionTitle>
        <h3 className={styles.aboutUs__subtitle}>У нас большая история!</h3>
        <ol className={styles.timeline}>
          <li className={styles.timeline__item}>
            <time className={styles.timeline__year} dateTime="1993">
              1993
            </time>
            <p className={styles.timeline__description}>
              В 1993 туристические компании ВКО Тревел и Тревелленд начинали
              свои первые шаги в туризме. Мы занимались туроператорской
              деятельностью в Чехии, Франции, Швейцарии, Италии, Испании,
              Германии и других странах мира. Очень быстро, благодаря ориентации
              на качество услуг, компании становятся лидерами среди
              туристических операторов.
            </p>
          </li>
          <li className={styles.timeline__item}>
            <time className={styles.timeline__year} dateTime="1999">
              1999
            </time>
            <p className={styles.timeline__description}>
              В 1999 году обе компании ВКО Тревел и Тревелленд объединяются в
              группу компаний ВКО Групп. В ВКО Групп также входит собственная
              сеть туристических агентств VKO Клуб (в данный момент сеть «TUI
              турагентство / Fun & Sun»).
            </p>
          </li>
          <li className={styles.timeline__item}>
            <time className={styles.timeline__year} dateTime="2009">
              2009
            </time>
            <p className={styles.timeline__description}>
              В 2009 году компанию ВКО Групп приобретает крупнейший европейский
              туристический оператор TUI.
            </p>
          </li>
          <li className={styles.timeline__item}>
            <time className={styles.timeline__year} dateTime="2012">
              2012
            </time>
            <p className={styles.timeline__description}>
              В 2012 году инкаминговые подразделения произвели ребрендинг и
              теперь мы работаем под маркой `&amp;quot;`iTravex`&amp;quot;`.
              Сохранив при этом юридические лица.
            </p>
          </li>
          <li className={styles.timeline__item}>
            <time className={styles.timeline__year} dateTime="2020">
              2020
            </time>
            <p className={styles.timeline__description}>
              Как известно в 2020 году весь мир был охвачен вирусом КОВИД и наша
              компания успешна прошла этот непростой период и продолжает свою
              деятельность.
            </p>
          </li>
        </ol>
      </section>
    </main>
  );
};

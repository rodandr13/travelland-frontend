import styles from "./styles.module.scss";
import clsx from "clsx";
import Image from "next/image";

export const ExcursionRoute = () => {
  return (
    <section className={styles.route}>
      <h2 className={styles.route__title}>Маршрут экскурсии</h2>
      <ol className={styles.route__list}>
        <li className={clsx(styles.route__item, styles.route__item_type_start)}>
          <div className={styles.route__container}>
            <h3 className={styles.route__subheader}>Место сбора</h3>
            <p className={styles.route__description}>
              Станция мето Мустек, выход в сторону улиц Йиндржишска и Водичкова.
              Адрес места встречи: Vaclavske nam. 791/32,110 00 Praha.
            </p>
            <p className={styles.route__caption}>
              На месте сбора вас будет ждать наш представитель с табличкой
              «iTRAVEX»
            </p>
          </div>
          <div className={styles.route__gallery}>
            <div className={styles.route__imageContainer}>
              <Image
                className={styles.route__image}
                src="/img_start.jpg"
                alt=""
                fill
              />
            </div>
          </div>
        </li>
        <li className={clsx(styles.route__item)}>
          <div className={styles.route__container}>
            <h3 className={styles.route__subheader}>
              Hluboka Castle over the Vltava
            </h3>
            <p className={styles.route__description}>
              Замок был основан в середине XIII века чешским королём на скале
              высотой 83 метра над рекой Влтавой недалеко от местечка Подгради и
              выстроен в готическом стиле. Первое письменное упоминание замка
              относится к 1285 году, когда его владельцем уже был род
              Витковичей. Его первоначальное название - замок Фрауенберг.
              Позднее он неоднократно перестраивался, приобретая то
              ренессансные, то барочные черты. За первые 400 лет существования
              (XIII-XVII век) замок сменил 26 хозяев.
            </p>
          </div>
          <div className={styles.route__gallery}>
            <div className={styles.route__imageContainer}>
              <Image
                className={styles.route__image}
                src="/rout1.jpg"
                alt=""
                fill
              />
            </div>
            <div className={styles.route__imageContainer}>
              <Image
                className={styles.route__image}
                src="/rout2.jpg"
                alt=""
                fill
              />
            </div>
            <div className={styles.route__imageContainer}>
              <Image
                className={styles.route__image}
                src="/rout3.jpg"
                alt=""
                fill
              />
            </div>
            <div className={styles.route__imageContainer}>
              <Image
                className={styles.route__image}
                src="/rout4.jpg"
                alt=""
                fill
              />
            </div>
            <div className={styles.route__imageContainer}>
              <Image
                className={styles.route__image}
                src="/rout5.jpg"
                alt=""
                fill
              />
            </div>
            <div className={styles.route__imageContainer}>
              <Image
                className={styles.route__image}
                src="/rout6.jpg"
                alt=""
                fill
              />
            </div>
          </div>
        </li>
        <li className={clsx(styles.route__item)}>
          <div className={styles.route__container}>
            <h3 className={styles.route__subheader}>
              Hluboka Castle over the Vltava
            </h3>
            <p className={styles.route__description}>
              Замок был основан в середине XIII века чешским королём на скале
              высотой 83 метра над рекой Влтавой недалеко от местечка Подгради и
              выстроен в готическом стиле. Первое письменное упоминание замка
              относится к 1285 году, когда его владельцем уже был род
              Витковичей. Его первоначальное название - замок Фрауенберг.
              Позднее он неоднократно перестраивался, приобретая то
              ренессансные, то барочные черты. За первые 400 лет существования
              (XIII-XVII век) замок сменил 26 хозяев.
            </p>
          </div>
          <div className={styles.route__gallery}>
            <div className={styles.route__imageContainer}>
              <Image
                className={styles.route__image}
                src="/rout3.jpg"
                alt=""
                fill
              />
            </div>
            <div className={styles.route__imageContainer}>
              <Image
                className={styles.route__image}
                src="/rout4.jpg"
                alt=""
                fill
              />
            </div>
            <div className={styles.route__imageContainer}>
              <Image
                className={styles.route__image}
                src="/rout5.jpg"
                alt=""
                fill
              />
            </div>
            <div className={styles.route__imageContainer}>
              <Image
                className={styles.route__image}
                src="/rout6.jpg"
                alt=""
                fill
              />
            </div>
          </div>
        </li>
        <li className={clsx(styles.route__item, styles.route__item_type_end)}>
          <div className={styles.route__container}>
            <h3 className={styles.route__subheader}>Место окончания</h3>
            <p className={styles.route__description}>
              Станция мето Мустек, выход в сторону улиц Йиндржишска и Водичкова.
              Адрес места встречи: Vaclavske nam. 791/32,110 00 Praha.
            </p>
          </div>
        </li>
      </ol>
    </section>
  );
};

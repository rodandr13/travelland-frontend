import { Duration } from "@/src/shared/types/excursion";

export const formatDuration = (
  duration: Duration,
  locale = "ru-RU"
): String => {
  const { days, minutes, hours } = duration;
  const pluralize = (
    count: number,
    singular: string,
    few: string,
    many: string,
    locale: string
  ) => {
    const pluralRules = new Intl.PluralRules(locale);
    const category = pluralRules.select(count);

    switch (category) {
      case "one":
        return singular;
      case "few":
        return few;
      default:
        return many;
    }
  };

  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days} ${pluralize(days, "день", "дня", "дней", locale)}`);
  }
  if (hours > 0) {
    parts.push(`${hours} ${pluralize(hours, "час", "часа", "часов", locale)}`);
  }
  if (minutes > 0) {
    parts.push(
      `${minutes} ${pluralize(minutes, "минута", "минуты", "минут", locale)}`
    );
  }

  return parts.join(" ").trim();
};

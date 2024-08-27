export const formatCountParticipants = (
  count: number,
  title: string,
  locale: string = "ru-RU"
): string => {
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

  if (count > 0 && title === "Взрослые") {
    return `${count} ${pluralize(count, "взрослый", "взрослых", "взрослых", locale)}`;
  }

  if (count > 0 && title === "Дети") {
    return `${count} ${pluralize(count, "ребенок", "ребенка", "детей", locale)}`;
  }

  return "";
};

import { Group, Radio, Stack, Text } from "@mantine/core";
import { IconCash, IconCreditCard, IconPercentage } from "@tabler/icons-react";
import { Controller, useFormContext } from "react-hook-form";

import styles from "../styles.module.scss";

export const PaymentMethods = () => {
  const { control } = useFormContext();

  type PaymentMethodName = "cardRu" | "card" | "prepayment" | "cash";

  type PaymentMethod = {
    name: PaymentMethodName;
    label: string;
    description: string;
    disabled: boolean;
  };

  const PaymentIcons = {
    cardRu: IconCreditCard,
    card: IconCreditCard,
    prepayment: IconPercentage,
    cash: IconCash,
  } as const;

  const data: PaymentMethod[] = [
    {
      name: "cardRu",
      label: "Банковская карта (выпущенная в РФ)",
      description: "Принимаются к оплате карты выпущенные на территории РФ.",
      disabled: true,
    },
    {
      name: "card",
      label: "Банковская карта (выпущенная не в РФ)",
      description: "К оплате принимаются карты выпущенные не на территории РФ.",
      disabled: false,
    },
    {
      name: "prepayment",
      label: "Предоплата картой 20% (выпущенная не в РФ)",
      description:
        "Забронировать услуги с предоплатой 20%. Остальную часть суммы можно оплатить на месте. К оплате принимаются карты выпущенные не на территории РФ.",
      disabled: false,
    },
    {
      name: "cash",
      label: "Наличные",
      description:
        "Оплатить наличными можно не позднее, чем за 48 часов до начала экскурсии. При сумме заказа от 50 € наш представитель может приехать в ваш отель.",
      disabled: false,
    },
  ];

  const getPaymentIcon = (paymentName: keyof typeof PaymentIcons) => {
    const IconComponent = PaymentIcons[paymentName];
    return <IconComponent stroke={1.5} size={24} />;
  };

  return (
    <section className={styles.paymentMethods}>
      <h2>Выберите способ оплаты</h2>
      <Controller
        name="paymentMethod"
        control={control}
        render={({ field }) => (
          <Radio.Group
            value={field.value}
            onChange={field.onChange}
            className={styles.methodsList}
          >
            <Stack pt="md" gap="xs">
              {data.map((item) => (
                <Radio.Card
                  key={item.name}
                  value={item.name}
                  className={styles.root}
                  disabled={item.disabled}
                >
                  <Group wrap="nowrap" align="flex-start">
                    <Radio.Indicator />
                    <Group wrap="nowrap" align="flex-start">
                      <div>{getPaymentIcon(item.name)}</div>
                      <div>
                        <Text className={styles.label}>{item.label}</Text>
                        <Text className={styles.description}>
                          {item.description}
                        </Text>
                      </div>
                    </Group>
                  </Group>
                </Radio.Card>
              ))}
            </Stack>
          </Radio.Group>
        )}
      />
    </section>
  );
};

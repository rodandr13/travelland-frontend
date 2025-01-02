"use client";

import { useState } from "react";

import { Group, Radio, Stack, Text } from "@mantine/core";

import styles from "./styles.module.scss";

import { setDetails } from "@/src/enities/booking/";
import { useAppDispatch } from "@/src/shared/lib/redux/hooks";
import { CartItemParticipants } from "@/src/shared/types/cart";
import { PriceBlock } from "@/src/shared/ui/priceBlock";

interface Props {
  id: string;
  groups: CartItemParticipants[];
}

export const SelectGroup = ({ id, groups }: Props) => {
  const dispatch = useAppDispatch();

  const [localGroups] = useState<CartItemParticipants[]>(groups);

  const [selectedGroupValue, setSelectedGroupValue] = useState<string | null>(
    null
  );

  const handleChange = (value: string) => {
    setSelectedGroupValue(value);

    const index = parseInt(value, 10);
    const selectedGroup = localGroups[index];

    if (id && selectedGroup) {
      const updatedGroup = {
        ...selectedGroup,
        quantity: 1,
      };

      dispatch(
        setDetails({
          key: id,
          details: {
            cart_item_options: [updatedGroup],
          },
        })
      );
    }
  };

  const selectData = localGroups.map((group, index) => {
    const value = index.toString();
    const current_price = group.current_price;
    const base_price = group.base_price;
    const label = `До ${group.groupSize} человек`;

    return { value, label, current_price, base_price };
  });

  const cards = selectData.map((item) => (
    <Radio.Card
      className={styles.root}
      radius="md"
      value={item.value}
      key={item.value}
    >
      <Group wrap="nowrap" align="flex-start">
        <Radio.Indicator />
        <Stack gap="xs">
          <Text className={styles.label}>{item.label}</Text>
          <PriceBlock
            actualPrice
            currentPrice={item.current_price}
            basePrice={item.base_price}
          />
        </Stack>
      </Group>
    </Radio.Card>
  ));

  return (
    <section className={styles.selectGroup}>
      <div className={styles.selectGroup__container}>
        <Radio.Group
          value={selectedGroupValue}
          onChange={handleChange}
          label="Выберите размер группы"
          description="Стоимость указанна за всю группу."
        >
          <Stack pt="md" gap="xs">
            {cards}
          </Stack>
        </Radio.Group>
      </div>
    </section>
  );
};

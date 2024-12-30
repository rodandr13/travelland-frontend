import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import {
  IconListDetails,
  IconLogout2,
  IconUserScan,
} from "@tabler/icons-react";
import Link from "next/link";

import styles from "./styles.module.scss";

import { useSignOut } from "@/src/features/signOut";

interface Props {
  user: {
    email: string;
    id: number;
    first_name: string;
  };
}

export const AccountButton = ({ user }: Props) => {
  const signOut = useSignOut();
  const handleSignOut = () => {
    signOut();
  };

  return (
    <Menu
      shadow="md"
      width={200}
      trigger="click-hover"
      openDelay={100}
      closeDelay={400}
      position="bottom-end"
    >
      <Menu.Target>
        <UnstyledButton className={styles.accountButton}>
          <Group gap="0">
            <Avatar
              src={null}
              alt=""
              variant="transparent"
              color="rgba(77, 77, 77, 1)"
            />
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {user.first_name}
              </Text>

              <Text c="dimmed" size="xs">
                {user.email}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconUserScan style={{ width: "18px", height: "18px" }} />
          }
          component={Link}
          href="/my/profile"
        >
          Профиль
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconListDetails style={{ width: "18px", height: "18px" }} />
          }
          component={Link}
          href="/my/orders"
        >
          Мои заказы
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconLogout2 style={{ width: "18px", height: "18px" }} />
          }
          onClick={handleSignOut}
        >
          Выйти
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

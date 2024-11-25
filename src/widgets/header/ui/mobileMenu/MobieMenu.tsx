"use client";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { HamburgerButton } from "@/src/widgets/header/ui/mobileMenu/components/HamburgerButton";

export const MobileMenu = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <HamburgerButton opened={opened} open={open} />
      <Drawer opened={opened} onClose={close}>
        {/* Drawer content */}
      </Drawer>
    </>
  );
};

import { useState } from "react";

import { useFormContext } from "react-hook-form";

import styles from "./styles.module.scss";

import { Button } from "@/src/shared/ui/button";

export const PromotionalCode = () => {
  const { setValue } = useFormContext();
  const [promoCodeInput, setPromoCodeInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCodeInput(e.target.value);
  };

  const handleApplyPromoCode = () => {
    if (promoCodeInput.trim()) {
      setValue("promoCode", promoCodeInput.trim());
    }
  };

  return (
    <section className={styles.promotionalCode}>
      <input
        className={styles.promotionalCode__input}
        placeholder="Промокод"
        value={promoCodeInput}
        onChange={handleChange}
      />
      <Button
        title="Применить"
        onClick={handleApplyPromoCode}
        disabled={!promoCodeInput.trim()}
      />
    </section>
  );
};

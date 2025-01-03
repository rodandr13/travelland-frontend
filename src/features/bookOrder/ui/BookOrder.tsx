"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { SubmitHandler, useFormContext } from "react-hook-form";

import { apiClient } from "@/src/shared/api";
import {
  EXTERNAL_API_BASE_URL,
  ORDER_ENDPOINTS,
} from "@/src/shared/lib/constants";
import { PaymentMethod } from "@/src/shared/types/orderResponse";
import { Button } from "@/src/shared/ui/button";
import { ContactsData } from "@/src/widgets/detailedCart/ui/DetailedCart";

interface Props {
  cartId: number;
}

type PaymentCreateResponse = {
  payment_method: PaymentMethod;
  token?: string;
  redirect?: string;
};

export const BookOrder = ({ cartId }: Props) => {
  const { handleSubmit } = useFormContext<ContactsData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const route = useRouter();
  const onSubmit: SubmitHandler<ContactsData> = async (formData) => {
    setIsLoading(true);
    setError(null);

    const order = {
      user: {
        email: formData.email,
        name: formData.name,
        telephone: formData.phone,
      },
      cartId: cartId,
      promoCode: formData.promoCode || "",
      paymentMethod: formData.paymentMethod,
    };

    try {
      const url = `${EXTERNAL_API_BASE_URL}${ORDER_ENDPOINTS.CREATE}`;
      const { data: response } = await apiClient<PaymentCreateResponse>(url, {
        method: "POST",
        body: order,
        credentials: "include",
      });

      if (
        response &&
        response.redirect &&
        (response.payment_method === "CARD" ||
          response.payment_method === "PREPAYMENT")
      ) {
        window.location.href = response.redirect;
      } else if (
        response &&
        response.token &&
        response.payment_method === "CASH"
      ) {
        route.replace(`/payment?token=${response.token}`);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        title={isLoading ? "Загрузка..." : "Заказать"}
        variant="confirm"
        type="submit"
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

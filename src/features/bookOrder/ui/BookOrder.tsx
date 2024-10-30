import { useState } from "react";

import { SubmitHandler, useFormContext } from "react-hook-form";

import { resetDetails } from "@/src/enities/booking";
import { apiClient } from "@/src/shared/api";
import {
  EXTERNAL_API_BASE_URL,
  ORDER_ENDPOINTS,
} from "@/src/shared/lib/constants";
import { useAppDispatch } from "@/src/shared/lib/redux/hooks";
import { CartItem } from "@/src/shared/types/cart";
import { Button } from "@/src/shared/ui/button";
import { ContactsData } from "@/src/widgets/detailedCart/ui/DetailedCart";

interface Props {
  items: CartItem[];
}

type PaymentCreateResponse = {
  success: boolean;
  message: string;
  redirect: string;
};

export const BookOrder = ({ items }: Props) => {
  const { handleSubmit } = useFormContext<ContactsData>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ContactsData> = async (formData) => {
    setIsLoading(true);
    setError(null);

    const order = {
      user: {
        email: formData.email,
        name: formData.name,
        telephone: formData.phone,
      },
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

      // if (response.success && response.redirect) {
      //   window.location.href = response.redirect;
      // }

      dispatch(resetDetails());
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

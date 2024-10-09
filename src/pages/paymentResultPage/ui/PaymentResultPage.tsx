import { cookies } from "next/headers";

import { apiClient } from "@/src/shared/api";
import {
  EXTERNAL_API_BASE_URL,
  PAYMENT_ENDPOINTS,
} from "@/src/shared/lib/constants";
import { SuccessfulOrder } from "@/src/shared/ui/successfulOrder";

interface Props {
  searchParams: {
    token: string;
  };
}

type PaymentResultResponse = {
  orderId: number;
  message: string;
  status: string;
};

export const PaymentResultPage = async ({ searchParams }: Props) => {
  const { token } = searchParams;
  const accessToken = cookies().get("accessToken")?.value;
  console.log("RENDER PaymentResultPage");
  console.log("accessToken", accessToken);
  const { orderId, message, status } = await apiClient<PaymentResultResponse>(
    `${EXTERNAL_API_BASE_URL}${PAYMENT_ENDPOINTS.STATUS}`,
    {
      method: "POST",
      body: { token: token },
      credentials: "include",
    }
  );

  return (
    <div>
      {token ? (
        <SuccessfulOrder orderNumber={orderId} />
      ) : (
        <p>Ошибка при обработке платежа: {message}</p>
      )}
    </div>
  );
};

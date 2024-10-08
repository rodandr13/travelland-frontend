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
  const { orderId, message, status } = await apiClient<PaymentResultResponse>(
    `${EXTERNAL_API_BASE_URL}${PAYMENT_ENDPOINTS.STATUS}`,
    {
      method: "POST",
      body: { token: token },
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

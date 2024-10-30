import { apiClient } from "@/src/shared/api";
import {
  EXTERNAL_API_BASE_URL,
  PAYMENT_ENDPOINTS,
} from "@/src/shared/lib/constants";

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
  const { data } = await apiClient<PaymentResultResponse>(
    `${EXTERNAL_API_BASE_URL}${PAYMENT_ENDPOINTS.STATUS}`,
    {
      method: "POST",
      body: { token: token },
      credentials: "include",
    }
  );

  return (
    <div>
      {/*{token ? (*/}
      {/*  <SuccessfulOrder orderNumber={orderId} />*/}
      {/*) : (*/}
      {/*  <p>Ошибка при обработке платежа: {message}</p>*/}
      {/*)}*/}
    </div>
  );
};

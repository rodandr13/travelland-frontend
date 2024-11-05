import { apiClient } from "@/src/shared/api";
import {
  EXTERNAL_API_BASE_URL,
  PAYMENT_ENDPOINTS,
} from "@/src/shared/lib/constants";
import { SuccessfulPayment } from "@/src/shared/ui/successfulPayment";
import { UnsuccessfulPayment } from "@/src/shared/ui/unsuccessfulPayment";

interface Props {
  searchParams: {
    token: string;
  };
}

type PaymentResultResponse = {
  order_id: number;
  message: string;
  status: string;
  result_text: string;
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

  const isSuccess = data.status !== "UNPAID";

  return (
    <div>
      {isSuccess ? (
        <SuccessfulPayment orderNumber={data.order_id} />
      ) : (
        <UnsuccessfulPayment
          orderNumber={data.order_id}
          message={data.message}
        />
      )}
    </div>
  );
};

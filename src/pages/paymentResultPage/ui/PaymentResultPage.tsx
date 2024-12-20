import { apiClient } from "@/src/shared/api";
import {
  EXTERNAL_API_BASE_URL,
  PAYMENT_ENDPOINTS,
} from "@/src/shared/lib/constants";
import { SuccessfulPayment } from "@/src/shared/ui/successfulPayment";
import { UnsuccessfulPayment } from "@/src/shared/ui/unsuccessfulPayment";

import styles from "./styles.module.scss";

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
  payment_method: string;
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
  const isSuccess =
    data.status !== "UNPAID" ||
    data.payment_method === "CASH" ||
    data.payment_method === "PREPAYMENT";

  return (
    <section className={styles.page}>
      {isSuccess ? (
        <SuccessfulPayment orderNumber={data.order_id} />
      ) : (
        <UnsuccessfulPayment
          orderNumber={data.order_id}
          message={data.message}
        />
      )}
    </section>
  );
};

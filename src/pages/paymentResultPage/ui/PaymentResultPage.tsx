import { SuccessfulOrder } from "@/src/shared/ui/successfulOrder";

interface Props {
  searchParams: {
    token: string;
  };
}

export const PaymentResultPage = ({ searchParams }: Props) => {
  const { token } = searchParams;
  return (
    <div>
      {token ? (
        <SuccessfulOrder orderNumber={token} />
      ) : (
        <p>Ошибка при обработке платежа: {token}</p>
      )}
    </div>
  );
};

interface Props {
  order: any;
}

export const SuccessfulOrder = ({ order }: Props) => {
  return (
    <section>
      <h2>Заказ успешно создан</h2>
      <p>На вашу почту отправлена информация о заказе.</p>
    </section>
  );
};

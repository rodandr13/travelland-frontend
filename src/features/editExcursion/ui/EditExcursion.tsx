import {
  resetDetails,
  selectExcursionIsEditing,
  setDetailsFromCart,
  setIsEditing,
} from "@/enities/booking";
import { selectBookingDetailsById } from "@/enities/booking/model/selectors";
import { selectItemById } from "@/enities/cart/model/selectors";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux/hooks";
import { Button } from "@/shared/ui/button";

import styles from "./styles.module.scss";

interface EditExcursion {
  id: string;
  handleScroll: () => void;
}

export const EditExcursion = ({ id, handleScroll }: EditExcursion) => {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(selectExcursionIsEditing(id));
  const cartItem = useAppSelector(selectItemById(id));
  const updatedItem = useAppSelector(selectBookingDetailsById(id));

  return !isEditing ? (
    <EditButton
      onClick={() => {
        if (cartItem) {
          dispatch(setIsEditing({ key: id, value: true }));
          dispatch(setDetailsFromCart(cartItem));
          setTimeout(() => {
            handleScroll();
          }, 0);
        }
      }}
    />
  ) : (
    <div className={styles.buttons__group}>
      <SaveButton
        onClick={() => {
          if (updatedItem) {
            dispatch(setIsEditing({ key: id, value: false }));
          }
        }}
      />
      <CancelButton
        onClick={() => {
          dispatch(setIsEditing({ key: id, value: false }));
          dispatch(resetDetails());
        }}
      />
    </div>
  );
};

interface ButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: ButtonProps) => (
  <Button title="Изменить параметры" onClick={onClick} variant="inline" />
);

const SaveButton = ({ onClick }: ButtonProps) => (
  <Button title="Сохранить" onClick={onClick} variant="inline" />
);

const CancelButton = ({ onClick }: ButtonProps) => (
  <Button title="Отменить" onClick={onClick} variant="inline" />
);

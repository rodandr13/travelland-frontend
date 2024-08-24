import {
  selectDetailsByKey,
  selectExcursionIsEditing,
  setDetailsFromCart,
  setIsEditing,
} from "@/src/enities/booking";
import { updateItem } from "@/src/enities/cart/model/cartSlice";
import { selectItemById } from "@/src/enities/cart/model/selectors";
import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
import { Button } from "@/src/shared/ui/button";

interface EditExcursion {
  id: string;
}

export const EditExcursion = ({ id }: EditExcursion) => {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(selectExcursionIsEditing(id));
  const cartItem = useAppSelector((state) => selectItemById(state, id));
  const updatedItem = useAppSelector(selectDetailsByKey(id));

  return !isEditing ? (
    <EditButton
      onClick={() => {
        if (cartItem) {
          dispatch(setIsEditing({ key: id, value: true }));
          dispatch(setDetailsFromCart(cartItem));
        }
      }}
    />
  ) : (
    <SaveButton
      onClick={() => {
        if (updatedItem) {
          dispatch(setIsEditing({ key: id, value: false }));
          dispatch(updateItem(updatedItem));
        }
      }}
    />
  );
};

interface ButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: ButtonProps) => (
  <Button title="Редактировать" onClick={onClick} />
);

const SaveButton = ({ onClick }: ButtonProps) => (
  <Button title="Сохранить изменения" onClick={onClick} />
);

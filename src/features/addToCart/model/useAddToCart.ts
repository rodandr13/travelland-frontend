import { useCallback, useState } from "react";

import { cartApi } from "@/src/enities/cart";
import { mapToDto } from "@/src/features/addToCart/lib/mappers";
import { CartItem } from "@/src/shared/types/cart";

interface AddToCartResult {
  success: boolean;
  error?: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAddToCart = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const addToCart = useCallback(
    async (item: CartItem): Promise<AddToCartResult> => {
      console.log(item);
      if (loading) {
        return { success: false, error: "Операция уже выполняется" };
      }

      const cartItemDto = mapToDto(item);

      try {
        setLoading(true);
        setError(null);
        await delay(1000);
        const cart = await cartApi.addItem(cartItemDto);
        console.log(cart);
        return { success: true };
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Не удалось добавить в корзину";

        setError(new Error(errorMessage));

        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    addToCart,
    loading,
    error,
    resetError,
  };
};

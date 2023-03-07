import { useState, ChangeEvent, useCallback } from "react";

type Quantity = string | number;

type Event = ChangeEvent<HTMLInputElement>;

const useQuantity = (minQuantity = 1, maxQuantity = 999) => {
  const [quantity, setQuantity] = useState<Quantity>(minQuantity);

  const increaseQuantity = useCallback(() => {
    if (quantity <= maxQuantity) {
      setQuantity((prev) => (prev ? parseInt(prev as string) + 1 : 1));
    }
  }, [maxQuantity, quantity]);

  const decreaseQuantity = useCallback(() => {
    if (quantity > minQuantity) {
      setQuantity((prev) => parseInt(prev as string) - 1);
    }
  }, [minQuantity, quantity]);

  const inputChangeQuantity = useCallback(
    (e: Event) => {
      const { value } = e.target;
      const newQuantity = value.split(/\D/).join("");

      if (
        parseInt(newQuantity) < minQuantity ||
        parseInt(newQuantity) > maxQuantity
      )
        return;

      setQuantity(newQuantity);
    },
    [minQuantity, maxQuantity]
  );

  const resetQuantity = useCallback(
    () => setQuantity(minQuantity),
    [minQuantity]
  );

  return {
    quantity,
    increaseQuantity,
    decreaseQuantity,
    inputChangeQuantity,
    resetQuantity,
  };
};

export default useQuantity;

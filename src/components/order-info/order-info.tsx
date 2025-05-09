import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { useParams, useLocation } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { getOrderByNumber } from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const location = useLocation();
  const orderData = useSelector(
    (store) => store.order.orderModalData || store.order.order
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByNumber(Number(number)));
  }, []);

  const ingredients: TIngredient[] = useSelector(
    (store) => store.ingredients.ingredients
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }
  const isModal = location.state?.background;

  return <OrderInfoUI orderInfo={orderInfo} isModal={isModal} />;
};

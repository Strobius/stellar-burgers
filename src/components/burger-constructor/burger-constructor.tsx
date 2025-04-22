import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { orderClose, orderBurger } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    (state) => state.burgerConstructor?.constructorItems
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderRequest = useSelector((store) => store.order.orderRequest);
  const orderModalData = useSelector((store) => store.order.orderModalData);
  const user = useSelector((store) => store.user.user);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      return navigate('/login');
    }

    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(
          (ingredient: TIngredient) => ingredient._id
        ),
        constructorItems.bun._id
      ])
    ).then((action) => {
      if (orderBurger.fulfilled.match(action)) {
        dispatch(clearConstructor());
      }
    });
  };

  const closeOrderModal = () => {
    dispatch(orderClose());
  };

  const price = useMemo(() => {
    if (!constructorItems) return 0;

    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients?.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );

    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

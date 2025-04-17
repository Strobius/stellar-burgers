import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { getOrder } from '../../services/slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector((store) => store.order.userOrders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};

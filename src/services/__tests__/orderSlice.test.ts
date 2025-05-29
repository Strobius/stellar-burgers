import {
  getFeed,
  orderSlice,
  initialState,
  getOrder,
  getOrderByNumber,
  orderBurger
} from '../slices/orderSlice';

describe('Тест orderSlice', () => {
  describe('Тест getFeed', () => {
    const mockFeed = {
      orders: [{ id: 1 }, { id: 2 }],
      total: 100,
      totalToday: 2
    };

    test('Тест pending', () => {
      const state = orderSlice.reducer(
        initialState,
        getFeed.pending('pending')
      );
      expect(state.error).toBeNull();
    });

    test('Тест rejected', () => {
      const action = {
        type: getFeed.rejected.type,
        error: { message: 'error' }
      };
      const state = orderSlice.reducer(initialState, action);
      expect(state.error).toBe('error');
    });

    test('Тест fulfilled', () => {
      const action = {
        type: getFeed.fulfilled.type,
        payload: mockFeed
      };
      const state = orderSlice.reducer(initialState, action);
      expect(state.feed).toEqual(mockFeed);
    });
  });

  describe('Тест getOrder', () => {
    const mockOrders = [{ id: 1 }, { id: 2 }];

    test('Тест pending', () => {
      const state = orderSlice.reducer(
        initialState,
        getOrder.pending('pending')
      );
      expect(state.error).toBeNull();
    });

    test('Тест rejected', () => {
      const action = {
        type: getOrder.rejected.type,
        error: { message: 'error' }
      };
      const state = orderSlice.reducer(initialState, action);
      expect(state.error).toBe('error');
    });

    test('Тест fulfilled', () => {
      const action = {
        type: getOrder.fulfilled.type,
        payload: mockOrders
      };
      const state = orderSlice.reducer(initialState, action);
      expect(state.userOrders).toEqual(mockOrders);
    });
  });

  describe('Тест getOrderByNumber', () => {
    const mockOrder = { id: 1, number: 123 };

    test('Тест rejected', () => {
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: 'error' }
      };
      const state = orderSlice.reducer(initialState, action);
      expect(state.error).toBe('error');
    });

    test('Тест fulfilled', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: [mockOrder] }
      };
      const state = orderSlice.reducer(initialState, action);
      expect(state.orderModalData).toEqual(mockOrder);
      expect(state.error).toBeNull();
    });
  });

  describe('Тест orderBurger', () => {
    const mockOrder = { number: 123 };

    test('Тест rejected', () => {
      const action = {
        type: orderBurger.rejected.type,
        error: { message: 'error' }
      };
      const state = orderSlice.reducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe('error');
    });

    test('Тест fulfilled', () => {
      const action = {
        type: orderBurger.fulfilled.type,
        payload: mockOrder
      };
      const state = orderSlice.reducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData?.number).toBe(mockOrder.number);
    });
  });
});

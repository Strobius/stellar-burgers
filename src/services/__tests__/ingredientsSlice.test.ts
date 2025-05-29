import {
  getIngredients,
  ingredientSlice,
  initialState
} from '../slices/ingredientSlice';

describe('Тесты для ingredientSlice', () => {
  const mockData = {
    pendingAction: { type: getIngredients.pending.type },
    rejectedAction: {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' }
    },
    fulfilledAction: {
      type: getIngredients.fulfilled.type,
      payload: [
        { _id: '1', name: 'Булочка', type: 'bun' },
        { _id: '2', name: 'Котлета', type: 'main' }
      ]
    }
  };

  test('Должен корректно обрабатывать состояние pending', () => {
    const newState = ingredientSlice.reducer(
      initialState,
      mockData.pendingAction
    );

    expect(newState).toEqual({
      ...initialState,
      isIngredientsLoading: true,
      error: null
    });
  });

  test('Должен корректно обрабатывать состояние rejected', () => {
    const newState = ingredientSlice.reducer(
      initialState,
      mockData.rejectedAction
    );

    expect(newState).toEqual({
      ...initialState,
      isIngredientsLoading: false,
      error: 'Ошибка загрузки'
    });
  });

  test('Должен корректно обрабатывать состояние fulfilled', () => {
    const newState = ingredientSlice.reducer(
      initialState,
      mockData.fulfilledAction
    );

    expect(newState).toEqual({
      ...initialState,
      isIngredientsLoading: false,
      ingredients: mockData.fulfilledAction.payload,
      error: null
    });
  });

  test('Начальное состояние должно соответствовать initialState', () => {
    expect(
      ingredientSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })
    ).toEqual(initialState);
  });
});

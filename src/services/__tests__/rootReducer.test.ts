import { userReducer } from '../slices/userSlice';
import { ingredientsReducer } from '../slices/ingredientSlice';
import { burgerConstructorReducer } from '../slices/constructorSlice';
import { orderReducer } from '../slices/orderSlice';
import { rootReducer } from '../store';

describe('тест rootReducer', () => {
  it('должен возвращать начальное состояние', () => {
    const expectedInitialState = {
      user: userReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      ingredients: ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      burgerConstructor: burgerConstructorReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      order: orderReducer(undefined, { type: 'UNKNOWN_ACTION' })
    };

    const actualInitialState = rootReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    expect(actualInitialState).toEqual(expectedInitialState);
  });
});

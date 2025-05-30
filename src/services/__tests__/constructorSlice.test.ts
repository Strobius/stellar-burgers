import { burgerConstructorReducer } from '../slices/constructorSlice';
import {
  addIngredient,
  removeIngredient,
  clearConstructor, 
  initialState
} from '../slices/constructorSlice';
import { TIngredient } from '@utils-types';

describe('Тесты для burgerConstructorSlice', () => {
  const mockBun: TIngredient = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 200,
    image: 'image',
    image_mobile: 'image_mobile',
    image_large: 'image_large'
  };

  const mockIngredient: TIngredient = {
    _id: '2',
    name: 'Котлета',
    type: 'main',
    proteins: 5,
    fat: 2,
    carbohydrates: 10,
    calories: 50,
    price: 100,
    image: 'image',
    image_mobile: 'image_mobile',
    image_large: 'image_large'
  };


  it('должен корректно обрабатывать начальное состояние', () => {
    expect(burgerConstructorReducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  describe('Добавление ингредиентов', () => {
    it('должен добавлять булку в конструктор', () => {
      const action = addIngredient(mockBun);
      const result = burgerConstructorReducer(initialState, action);

      expect(result.constructorItems.bun).toEqual({
        ...mockBun,
        id: expect.any(String)
      });
      expect(result.constructorItems.ingredients).toHaveLength(0);
    });

    it('должен добавлять обычный ингредиент в конструктор', () => {
      const action = addIngredient(mockIngredient);
      const result = burgerConstructorReducer(initialState, action);

      expect(result.constructorItems.bun).toBeNull();
      expect(result.constructorItems.ingredients).toHaveLength(1);
      expect(result.constructorItems.ingredients[0]).toEqual({
        ...mockIngredient,
        id: expect.any(String)
      });
    });
  });

  describe('Удаление ингредиентов', () => {
    it('должен удалять ингредиент из конструктора', () => {
      const addAction = addIngredient(mockIngredient);
      const stateWithIngredient = burgerConstructorReducer(
        initialState,
        addAction
      );

      const ingredientId =
        stateWithIngredient.constructorItems.ingredients[0].id;

      const removeAction = removeIngredient({ id: ingredientId });
      const result = burgerConstructorReducer(
        stateWithIngredient,
        removeAction
      );

      expect(result.constructorItems.ingredients).toHaveLength(0);
    });
  });

  describe('Очистка конструктора', () => {
    it('должен полностью очищать конструктор', () => {
      const addBunAction = addIngredient(mockBun);
      let state = burgerConstructorReducer(initialState, addBunAction);

      const addIngredientAction = addIngredient(mockIngredient);
      state = burgerConstructorReducer(state, addIngredientAction);

      const result = burgerConstructorReducer(state, clearConstructor());

      expect(result.constructorItems.bun).toBeNull();
      expect(result.constructorItems.ingredients).toHaveLength(0);
    });

    it('должен корректно работать с пустым конструктором', () => {
      const result = burgerConstructorReducer(initialState, clearConstructor());

      expect(result.constructorItems.bun).toBeNull();
      expect(result.constructorItems.ingredients).toHaveLength(0);
    });
  });
});

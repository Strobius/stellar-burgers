import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

interface TConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: TConstructorState = {
  constructorItems: { bun: null, ingredients: [] },
  isLoading: false,
  error: null
};

const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        const { type } = payload;
        type === 'bun'
          ? (state.constructorItems.bun = payload)
          : state.constructorItems.ingredients.push(payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },

    removeIngredient: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          ({ id }) => id !== payload.id
        );
    },

    clearConstructor: (state) => {
      Object.assign(state.constructorItems, { bun: null, ingredients: [] });
    },

    moveIngredientUp: (state, { payload }: PayloadAction<{ id: string }>) => {
      const items = state.constructorItems.ingredients;
      const i = items.findIndex((item) => item.id === payload.id);
      if (i > 0) [items[i - 1], items[i]] = [items[i], items[i - 1]];
    },

    moveIngredientDown: (state, { payload }: PayloadAction<{ id: string }>) => {
      const items = state.constructorItems.ingredients;
      const i = items.findIndex((item) => item.id === payload.id);
      if (i !== -1 && i < items.length - 1)
        [items[i], items[i + 1]] = [items[i + 1], items[i]];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredientUp,
  moveIngredientDown
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

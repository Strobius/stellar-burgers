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

    removeIngredient: (state, { payload }: PayloadAction<{ _id: string }>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          ({ _id }) => _id !== payload._id
        );
    },

    clearConstructor: (state) => {
      Object.assign(state.constructorItems, { bun: null, ingredients: [] });
    },

    moveIngredientUp: (state, { payload }: PayloadAction<{ id: string }>) => {
      const index = state.constructorItems.ingredients.findIndex(
        (item) => item.id === payload.id
      );
      if (index > 0) {
        const temp = state.constructorItems.ingredients[index - 1];
        state.constructorItems.ingredients[index - 1] =
          state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] = temp;
      }
    },

    moveIngredientDown: (state, { payload }: PayloadAction<{ id: string }>) => {
      const index = state.constructorItems.ingredients.findIndex(
        (item) => item.id === payload.id
      );
      if (
        index < state.constructorItems.ingredients.length - 1 &&
        index !== -1
      ) {
        const temp = state.constructorItems.ingredients[index + 1];
        state.constructorItems.ingredients[index + 1] =
          state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] = temp;
      }
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

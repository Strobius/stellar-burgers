import {
  userReducer,
  initialState,
  setUser,
  setAuthChecked
} from '../slices/userSlice';
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateUser
} from '../slices/userSlice';

// Константы для тестов
const mockUser = { name: 'Тест', email: 'test@test.com' };
const mockError = 'Ошибка';
const stateWithUser = {
  ...initialState,
  user: mockUser as any
};

describe('Тест редьюсера userSlice', () => {
  it('Тест начального состояния', () => {
    const result = userReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  describe('Тест метода setUser', () => {
    it('Тест успешного выполнения', () => {
      const state = userReducer(initialState, setUser(mockUser as any));
      expect(state.user).toEqual(mockUser);
    });
  });

  describe('Тест метода setAuthChecked', () => {
    it('Тест успешного выполнения', () => {
      const state = userReducer(initialState, setAuthChecked(true));
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('Тест метода registerUser', () => {
    it('Тест состояния pending', () => {
      const state = userReducer(
        initialState,
        registerUser.pending('pending', {} as any)
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it('Тест состояния fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userReducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('Тест состояния rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        payload: mockError
      };
      const state = userReducer(initialState, action);
      expect(state.error).toBe(mockError);
      expect(state.isAuthChecked).toBe(false);
    });
  });

  describe('Тест метода loginUser', () => {
    it('Тест состояния pending', () => {
      const state = userReducer(
        initialState,
        loginUser.pending('pending', {} as any)
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBeUndefined();
    });

    it('Тест состояния fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userReducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('Тест состояния rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        payload: mockError
      };
      const state = userReducer(initialState, action);
      expect(state.error).toBe(mockError);
    });
  });

  describe('Тест метода logoutUser', () => {
    it('Тест состояния fulfilled', () => {
      const action = logoutUser.fulfilled(undefined, '', undefined);
      const state = userReducer(stateWithUser, action);
      expect(state.user).toBeNull();
    });

    it('Тест состояния rejected', () => {
      const error = new Error(mockError);
      const action = logoutUser.rejected(error, '', undefined, error);
      const state = userReducer(initialState, action);
      expect(state.error).toBe(mockError);
    });
  });

  describe('Тест метода forgotPassword', () => {
    it('Тест состояния pending', () => {
      const stateWithError = { ...initialState, error: mockError };
      const state = userReducer(
        stateWithError,
        forgotPassword.pending('pending', {} as any)
      );
      expect(state.error).toBeUndefined();
    });

    it('Тест состояния rejected', () => {
      const action = {
        type: forgotPassword.rejected.type,
        payload: mockError
      };
      const state = userReducer(initialState, action);
      expect(state.error).toBe(mockError);
    });
  });

  describe('Тест метода resetPassword', () => {
    it('Тест состояния pending', () => {
      const stateWithError = { ...initialState, error: mockError };
      const state = userReducer(
        stateWithError,
        resetPassword.pending('pending', {} as any)
      );
      expect(state.error).toBeUndefined();
    });

    it('Тест состояния rejected', () => {
      const action = {
        type: resetPassword.rejected.type,
        payload: mockError
      };
      const state = userReducer(initialState, action);
      expect(state.error).toBe(mockError);
    });
  });

  describe('Тест метода updateUser', () => {
    const updatedUser = { name: 'Обновленный', email: 'updated@test.com' };

    it('Тест состояния fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: updatedUser
      };
      const state = userReducer(initialState, action);
      expect(state.user).toEqual(updatedUser);
    });

    it('Тест состояния rejected', () => {
      const error = new Error(mockError);
      const action = {
        type: updateUser.rejected.type,
        error: { message: error.message }
      };
      const state = userReducer(initialState, action);
      expect(state.error).toBe(mockError);
    });
  });
});
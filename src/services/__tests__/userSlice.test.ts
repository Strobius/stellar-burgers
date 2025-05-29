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

describe('Тест редьюсера userSlice', () => {
  it('Тест начального состояния', () => {
    const result = userReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  describe('Тест метода setUser', () => {
    it('Тест успешного выполнения', () => {
      const user = { name: 'Тест', email: 'test@test.com' };
      const state = userReducer(initialState, setUser(user as any));
      expect(state.user).toEqual(user);
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
      const user = { name: 'Тест', email: 'test@test.com' };
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user }
      };
      const state = userReducer(initialState, action);
      expect(state.user).toEqual(user);
      expect(state.isAuthChecked).toBe(true);
    });

    it('Тест состояния rejected', () => {
      const error = 'Ошибка регистрации';
      const action = {
        type: registerUser.rejected.type,
        payload: error
      };
      const state = userReducer(initialState, action);
      expect(state.error).toBe(error);
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
      const user = { name: 'Тест', email: 'test@test.com' };
      const action = {
        type: loginUser.fulfilled.type,
        payload: { user }
      };
      const state = userReducer(initialState, action);
      expect(state.user).toEqual(user);
      expect(state.isAuthChecked).toBe(true);
    });

    it('Тест состояния rejected', () => {
      const error = 'Ошибка входа';
      const action = {
        type: loginUser.rejected.type,
        payload: error
      };
      const state = userReducer(initialState, action);
      expect(state.error).toBe(error);
    });
  });

  describe('Тест метода logoutUser', () => {
    it('Тест состояния fulfilled', () => {
      const stateWithUser = {
        ...initialState,
        user: { name: 'Тест', email: 'test@test.com' } as any
      };
      const action = logoutUser.fulfilled(undefined, '', undefined);
      const state = userReducer(stateWithUser, action);
      expect(state.user).toBeNull();
    });

    it('Тест состояния rejected', () => {
      const error = new Error('Ошибка выхода');
      const action = logoutUser.rejected(error, '', undefined, error);
      const state = userReducer(initialState, action);
      expect(state.error).toBe(error.message);
    });
  });

  describe('Тест метода forgotPassword', () => {
    it('Тест состояния pending', () => {
      const stateWithError = { ...initialState, error: 'Какая-то ошибка' };
      const state = userReducer(
        stateWithError,
        forgotPassword.pending('pending', {} as any)
      );
      expect(state.error).toBeUndefined();
    });

    it('Тест состояния rejected', () => {
      const error = 'Ошибка восстановления пароля';
      const action = {
        type: forgotPassword.rejected.type,
        payload: error
      };
      const state = userReducer(initialState, action);
      expect(state.error).toBe(error);
    });
  });

  describe('Тест метода resetPassword', () => {
    it('Тест состояния pending', () => {
      const stateWithError = { ...initialState, error: 'Какая-то ошибка' };
      const state = userReducer(
        stateWithError,
        resetPassword.pending('pending', {} as any)
      );
      expect(state.error).toBeUndefined();
    });

    it('Тест состояния rejected', () => {
      const error = 'Ошибка сброса пароля';
      const action = {
        type: resetPassword.rejected.type,
        payload: error
      };
      const state = userReducer(initialState, action);
      expect(state.error).toBe(error);
    });
  });

  describe('Тест метода updateUser', () => {
    it('Тест состояния fulfilled', () => {
      const user = { name: 'Обновленный', email: 'updated@test.com' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: user
      };
      const state = userReducer(initialState, action);
      expect(state.user).toEqual(user);
    });

    it('Тест состояния rejected', () => {
      const error = new Error('Ошибка обновления');
      const action = {
        type: updateUser.rejected.type,
        error: { message: error.message }
      };
      const state = userReducer(initialState, action);
      expect(state.error).toBe(error.message);
    });
  });
});

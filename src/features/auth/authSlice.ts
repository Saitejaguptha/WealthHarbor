import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { addNotification } from '../../utils/watchlistUtils';

interface User {
  username: string;
  email: string;
  mobile: string;
  gender: string;
  dob: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: localStorage.getItem('wealthharbor_session') ? JSON.parse(localStorage.getItem('wealthharbor_session')!) : null,
  isAuthenticated: !!localStorage.getItem('wealthharbor_session'),
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      const users = JSON.parse(localStorage.getItem('wealthharbor_users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password, ...userSession } = foundUser;
        state.user = userSession;
        state.isAuthenticated = true;
        localStorage.setItem('wealthharbor_session', JSON.stringify(userSession));
        addNotification(email, `Welcome back, ${userSession.username}!`);
      }
    },
    signup: (state, action: PayloadAction<User & { password: string }>) => {
      const userData = action.payload;
      const users = JSON.parse(localStorage.getItem('wealthharbor_users') || '[]');
      
      if (!users.some((u: any) => u.email === userData.email)) {
        users.push(userData);
        localStorage.setItem('wealthharbor_users', JSON.stringify(users));
        
        const { password, ...userSession } = userData;
        state.user = userSession;
        state.isAuthenticated = true;
        localStorage.setItem('wealthharbor_session', JSON.stringify(userSession));
        addNotification(userData.email, `Welcome, ${userData.username}! Your account has been created.`);
      }
    },
    logout: (state) => {
      if (state.user?.email) {
        addNotification(state.user.email, 'You have been logged out successfully. See you soon!');
      }
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('wealthharbor_session');
    },
    updateUser: (state, action: PayloadAction<Partial<User> & { password?: string }>) => {
      if (!state.user) return;
      
      const userData = action.payload;
      const users = JSON.parse(localStorage.getItem('wealthharbor_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.email === state.user!.email);
      
      if (userIndex !== -1) {
        // Check if new email already exists (if email is being changed)
        if (userData.email && userData.email !== state.user.email) {
          if (users.some((u: any) => u.email === userData.email)) {
            return;
          }
        }
        
        const updatedUser = { ...users[userIndex], ...userData };
        users[userIndex] = updatedUser;
        localStorage.setItem('wealthharbor_users', JSON.stringify(users));
        
        const { password: _, ...userSession } = updatedUser;
        state.user = userSession;
        localStorage.setItem('wealthharbor_session', JSON.stringify(userSession));
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
});

export const { login, signup, logout, updateUser, setLoading } = authSlice.actions;
export default authSlice.reducer;

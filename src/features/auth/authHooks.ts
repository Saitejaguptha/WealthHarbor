import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login as loginAction, signup as signupAction, logout as logoutAction, updateUser as updateUserAction } from './authSlice';

interface User {
  username: string;
  email: string;
  mobile: string;
  gender: string;
  dob: string;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  const login = (email: string, password: string) => {
    dispatch(loginAction({ email, password }));
    
    // Check if session was created by the reducer synchronously
    const session = localStorage.getItem('wealthharbor_session');
    if (session) {
      const parsedSession = JSON.parse(session);
      return parsedSession.email === email;
    }
    return false;
  };

  const signup = (userData: User & { password: string }) => {
    // Check if email already exists before dispatching
    const users = JSON.parse(localStorage.getItem('wealthharbor_users') || '[]');
    if (users.some((u: any) => u.email === userData.email)) {
      return false; // Email already in use
    }
    
    dispatch(signupAction(userData));
    return true;
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const updateUser = (userData: Partial<User> & { password?: string }) => {
    dispatch(updateUserAction(userData));
    return true;
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };
};

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  username: string;
  email: string;
  mobile: string;
  gender: string;
  dob: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (userData: User & { password: string }) => boolean;
  logout: () => void;
  updateUser: (userData: Partial<User> & { password?: string }) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('wealthharbor_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('wealthharbor_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userSession } = foundUser;
      setUser(userSession);
      localStorage.setItem('wealthharbor_session', JSON.stringify(userSession));
      return true;
    }
    return false;
  };

  const signup = (userData: User & { password: string }): boolean => {
    const users = JSON.parse(localStorage.getItem('wealthharbor_users') || '[]');
    if (users.some((u: any) => u.email === userData.email)) {
      return false; // Email already exists
    }
    
    users.push(userData);
    localStorage.setItem('wealthharbor_users', JSON.stringify(users));
    
    const { password, ...userSession } = userData;
    setUser(userSession);
    localStorage.setItem('wealthharbor_session', JSON.stringify(userSession));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wealthharbor_session');
  };

  const updateUser = (userData: Partial<User> & { password?: string }): boolean => {
    if (!user) return false;
    
    const users = JSON.parse(localStorage.getItem('wealthharbor_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === user.email);
    
    if (userIndex === -1) return false;
    
    // Check if new email already exists (if email is being changed)
    if (userData.email && userData.email !== user.email) {
      if (users.some((u: any) => u.email === userData.email)) {
        return false;
      }
    }

    const updatedUser = { ...users[userIndex], ...userData };
    users[userIndex] = updatedUser;
    localStorage.setItem('wealthharbor_users', JSON.stringify(users));
    
    // Update session (excluding password)
    const { password: _, ...userSession } = updatedUser;
    setUser(userSession);
    localStorage.setItem('wealthharbor_session', JSON.stringify(userSession));
    
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

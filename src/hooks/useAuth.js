import { useSmartGen } from '../context/SmartGenContext';

export function useAuth() {
  const { user, login, logout } = useSmartGen();
  return { user, login, logout, isAuthenticated: !!user };
}
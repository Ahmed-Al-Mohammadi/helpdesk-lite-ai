import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Role = 'admin' | 'employee' | null;
export type Theme = 'light' | 'dark';

interface AppContextValue {
  role: Role;
  setRole: (r: Role) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(null);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  const setRole = (r: Role) => setRoleState(r);
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <AppContext.Provider value={{ role, setRole, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

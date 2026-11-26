import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthContextValue, AuthUser, LoginProps } from "../types";
import auth from "../api/auth";


const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    auth
      .getMe()
      .then((res) => {
        if (!cancelled) {
          setUser(res.data.data as AuthUser);
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function login(credentials: LoginProps) {
    await auth.login(credentials);
    try {
      const me = await auth.getMe();
      setUser(me.data.data as AuthUser);
    } catch (err) {
      localStorage.removeItem("token");
      throw err;
    }
  }
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null)
    throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

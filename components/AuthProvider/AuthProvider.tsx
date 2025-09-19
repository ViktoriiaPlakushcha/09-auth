"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [checking, setChecking] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const ok = await checkSession();
        if (ok) {
          const user = await getMe();
          if (!cancelled) setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [setUser, clearIsAuthenticated]);

  if (checking) return <div className="loader">Loading, please wait...</div>;
  return <>{children}</>;
}

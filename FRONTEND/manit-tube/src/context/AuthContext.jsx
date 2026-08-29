import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  getCurrentUser,
  logoutUser,
} from "../api/authApi";

const AuthContext =
  createContext(null);

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  /*
  |--------------------------------------------------------------------------
  | Fetch Current User
  |--------------------------------------------------------------------------
  */

  const fetchCurrentUser =
    useCallback(async () => {
      try {
        const data =
          await getCurrentUser();

        const currentUser =
          data?.user ||
          data?.data?.user ||
          null;

        setUser(currentUser);

        return currentUser;
      } catch (error) {
        /*
         * 401 simply means the user is
         * not authenticated.
         */
        setUser(null);

        return null;
      } finally {
        setLoading(false);
      }
    }, []);

  /*
  |--------------------------------------------------------------------------
  | Check Authentication on App Start
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  /*
  |--------------------------------------------------------------------------
  | Login
  |--------------------------------------------------------------------------
  */

  const login = useCallback(
    async (userData = null) => {
      /*
       * Login API may already return
       * the user.
       */
      const loggedInUser =
        userData?.user ||
        userData?.data?.user ||
        null;

      if (loggedInUser) {
        setUser(loggedInUser);
      }

      /*
       * Ask backend for the actual
       * authenticated user.
       */
      const currentUser =
        await fetchCurrentUser();

      return (
        currentUser ||
        loggedInUser
      );
    },
    [fetchCurrentUser]
  );

  /*
  |--------------------------------------------------------------------------
  | Logout
  |--------------------------------------------------------------------------
  */

  const logout = useCallback(
    async () => {
      try {
        await logoutUser();
      } catch (error) {
        console.error(
          "Logout error:",
          error
        );
      } finally {
        /*
         * Always remove frontend auth state.
         */
        setUser(null);
      }
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | Refresh User
  |--------------------------------------------------------------------------
  */

  const refreshUser =
    useCallback(async () => {
      return await fetchCurrentUser();
    }, [fetchCurrentUser]);

  return (
    <AuthContext.Provider
      value={{
        user,

        loading,

        login,

        logout,

        refreshUser,

        isAuthenticated:
          Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const AuthContext = createContext(null);

const API_URL = "http://localhost:8000/api/v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
   * Get currently logged-in user
   *
   * IMPORTANT:
   * credentials: "include" sends the JWT cookie
   * to the backend.
   */
  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/users/me`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        setUser(null);
        return null;
      }

      const data = await response.json();

      /*
       * Backend can return:
       *
       * { user: {...} }
       *
       * or
       *
       * { data: { user: {...} } }
       */
      const currentUser =
        data?.user ||
        data?.data?.user ||
        null;

      setUser(currentUser);

      return currentUser;
    } catch (error) {
      console.error(
        "Auth check failed:",
        error
      );

      setUser(null);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /*
   * Check authentication when application starts.
   */
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  /*
   * Used after successful login.
   *
   * We don't blindly trust the response from login.
   * We ask /users/me again so AuthContext contains
   * exactly the same user that backend recognizes.
   */
  const login = useCallback(
    async (userData = null) => {
      /*
       * Immediately update UI if login API returned
       * a user object.
       */
      if (userData) {
        const loggedInUser =
          userData?.user ||
          userData?.data?.user ||
          userData;

        if (
          loggedInUser &&
          typeof loggedInUser === "object"
        ) {
          setUser(loggedInUser);
        }
      }

      /*
       * Confirm authentication from backend.
       */
      const currentUser =
        await fetchCurrentUser();

      return currentUser;
    },
    [fetchCurrentUser]
  );

  /*
   * Logout
   */
  const logout = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(
          "Logout request failed:",
          response.status
        );
      }
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    } finally {
      /*
       * Always clear frontend auth state.
       */
      setUser(null);
    }
  }, []);

  /*
   * Refresh authentication manually.
   */
  const refreshUser = useCallback(async () => {
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
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
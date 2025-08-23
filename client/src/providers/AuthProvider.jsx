import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { api } from "../services/api";
import { setAuthorizationHeader } from "../services/interceptors";
import { clearAuth, getAuth, setAuth } from "../services/strorage";

const AuthContext = createContext();

const initialState = {
  token: null,
  status: "idle", // 'idle' | 'authenticating' | 'authenticated' | 'error'
};

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        ...action.payload,
        status: action.payload.token ? "authenticated" : "idle",
      };
    case "LOGIN_START":
      return { ...state, status: "authenticating" };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user ?? null,
        status: "authenticated",
      };
    case "LOGIN_ERROR":
      return { ...state, status: "error" };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = getAuth();
      if (raw) {
        dispatch({
          type: "INIT",
          payload: { token: raw.token ?? null },
        });
      }
    } catch (_) {} // ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist whenever token/user changes
  useEffect(() => {
    const { token } = state;
    if (token) {
      setAuth(token);
    } else {
      clearAuth();
    }
  }, [state, state.token]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function signIn(params) {
    dispatch({ type: "LOGIN_START" });
    const { email, password } = params;
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token } = response.data;
      dispatch({ type: "LOGIN_SUCCESS", payload: { token } });
      setAuthorizationHeader({ request: api.defaults, token });
      setAuth(token);
      return true;
    } catch (error) {
      return error;
    }
  }

  function signOut() {
    dispatch({ type: "LOGOUT" });
  }

  async function signUp(params) {
    const { email, password } = params;
    try {
      await api.post("/auth/register", { email, password });
      return true;
    } catch (error) {
      return error;
    }
  }

  const value = useMemo(
    () => ({
      token: state.token,
      user: state.user,
      status: state.status,
      signIn,
      signOut,
      signUp,
      isAuthenticated: !!state.token,
    }),
    [state.token, state.user, state.status, signIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};

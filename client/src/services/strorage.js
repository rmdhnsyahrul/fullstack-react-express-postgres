export const getAuth = () => {
  try {
    return (
      JSON.parse(localStorage.getItem("auth")) ?? { token: null, user: null }
    );
  } catch {
    return { token: null, user: null };
  }
};

export const setAuth = (data) =>
  localStorage.setItem("auth", JSON.stringify(data));
export const clearAuth = () => localStorage.removeItem("auth");

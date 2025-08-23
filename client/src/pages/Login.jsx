import React, { useEffect, useState } from "react";
import { useAuth } from "../providers";
import { Link } from "react-router-dom";
// import { useAuth } from "../utils/AuthProvider";

function initialFormValues() {
  return {
    email: "",
    password: "",
  };
}

function Login() {
  const [values, setValues] = useState(initialFormValues);
  const [loginRequestStatus, setLoginRequestStatus] = useState("success");
  const { signIn } = useAuth();

  function handleChange(event) {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoginRequestStatus("loading");

    try {
      await signIn(values);
    } catch (error) {
      /**
       * an error handler can be added here
       */
    } finally {
      setLoginRequestStatus("success");
    }
  }

  useEffect(() => {
    // clean the function to prevent memory leak
    return () => setLoginRequestStatus("success");
  }, []);

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={values.email}
            type="email"
            name="email"
            id="email"
            disabled={loginRequestStatus === "loading"}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            value={values.password}
            type="password"
            name="password"
            id="password"
            disabled={loginRequestStatus === "loading"}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loginRequestStatus === "loading"}>
          {loginRequestStatus === "loading" ? "Loading..." : "Submit"}
        </button>
        <Link to={"/register"}>Sign Up</Link>
      </form>
    </div>
  );
}

export default Login;

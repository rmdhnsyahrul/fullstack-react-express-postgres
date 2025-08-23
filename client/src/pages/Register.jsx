import React, { useEffect, useState } from "react";
import { useAuth } from "../providers";
import { Link } from "react-router-dom";
function initialFormValues() {
  return {
    email: "",
    password: "",
  };
}

const Register = () => {
  const [values, setValues] = useState(initialFormValues);
  const [registerStatus, setRegisterStatus] = useState("success");

  const { signUp } = useAuth();

  function handleChange(event) {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setRegisterStatus("loading");

    try {
      await signUp(values);
    } catch (error) {
      /**
       * an error handler can be added here
       */
    } finally {
      setRegisterStatus("success");
    }
  }

  useEffect(() => {
    // clean the function to prevent memory leak
    return () => setRegisterStatus("success");
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
            disabled={registerStatus === "loading"}
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
            disabled={registerStatus === "loading"}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={registerStatus === "loading"}>
          {registerStatus === "loading" ? "Loading..." : "Sign Up"}
        </button>
        <Link to={"/login"}>Login</Link>
      </form>
    </div>
  );
};

export default Register;

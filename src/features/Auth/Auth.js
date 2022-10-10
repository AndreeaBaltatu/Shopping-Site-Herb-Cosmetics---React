import clsx from "clsx";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Navigate, useLocation } from "react-router-dom";
import styles from "./Auth.module.css";
import { useAuthContext } from "./AuthContext";

export function Auth() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    retype_password: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    retype_password: "",
    firstName: "",
    lastName: "",
    serverError: "",
  });
  const { login, accessToken } = useAuthContext();

  const { pathname } = useLocation();
  const isRegister = pathname === "/register";

  if (accessToken) {
    return <Navigate to="/profile" />;
  }

  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: "" });
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validation = validateForm(values, isRegister);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    let { retype_password, ...dataForServer } = values;

    let apiPath = "register";
    if (!isRegister) {
      dataForServer = {
        email: values.email,
        password: values.password,
      };
      apiPath = "login";
    }

    const data = await fetch(`http://localhost:3000/api/${apiPath}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataForServer),
    }).then((res) => res.json());

    if (!data.accessToken) {
      setErrors({ ...errors, serverError: data });
      return;
    }

    login(data);
  }

  return (
    <>
      <h1 className="w-full text-3xl font-bold text-center">
        {isRegister ? "Register" : "Login"}
      </h1>
      {errors.serverError && (
        <p className={styles["errors"]}>
          <FontAwesomeIcon icon={solid("circle-exclamation")} />{" "}
          {errors.serverError}
        </p>
      )}
      <div className={styles["removeBG"]}>
        <form onSubmit={handleSubmit}>
          <div className={styles["container"]}>
            <img
              src="https://www.w3schools.com/howto/img_avatar2.png"
              alt="Avatar"
              class="avatar"
            />

            <label htmlFor="email" className={styles["removeBG"]}>
              Email
            </label>
            <input
              className={errors.email && styles["errors"]}
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleInputChange}
            />

            {errors.email && <p className={styles["errors"]}>{errors.email}</p>}

            <label htmlFor="password" className={styles["removeBG"]}>
              Password
            </label>
            <input
              className={clsx("border rounded border-black ml-1", {
                "border-red-800": errors.password,
              })}
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleInputChange}
            />

            {errors.password && (
              <p className={styles["errors"]}>{errors.password}</p>
            )}

            {isRegister && (
              <>
                <div className={styles["registerContainer"]}>
                  <label
                    htmlFor="retype_password"
                    className={styles["removeBG"]}
                  >
                    Retype password
                  </label>
                  <input
                    className={clsx("border rounded border-black ml-1", {
                      "border-red-800": errors.retype_password,
                    })}
                    type="password"
                    name="retype_password"
                    id="retype_password"
                    value={values.retype_password}
                    onChange={handleInputChange}
                  />

                  {errors.retype_password && (
                    <p className={styles["errors"]}>{errors.retype_password}</p>
                  )}

                  <label htmlFor="firstName" className={styles["removeBG"]}>
                    First Name
                  </label>
                  <input
                    className={clsx("border rounded border-black ml-1", {
                      "border-red-800": errors.firstName,
                    })}
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={values.firstName}
                    onChange={handleInputChange}
                  />

                  {errors.firstName && (
                    <p className={styles["errors"]}>{errors.firstName}</p>
                  )}

                  <label htmlFor="lastName" className={styles["removeBG"]}>
                    Last Name
                  </label>
                  <input
                    className={clsx("border rounded border-black ml-1", {
                      "border-red-800": errors.lastName,
                    })}
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={values.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.lastName && (
                  <p className={styles["errors"]}>{errors.lastName}</p>
                )}
              </>
            )}
            <div className={styles["removeBG"]}>
              <button className={styles["container"]}>
                {isRegister ? "Register" : "Login"}
              </button>

              {!isRegister && (
                <div className={styles["loginValidation"]}>
                  <p>Nu ai un cont?</p>
                  <a href="/register" alt="register">
                    Inregistreaza-te
                  </a>
                </div>
              )}
              {isRegister && (
                <div className={styles["loginValidation"]}>
                  <p>Ai deja un cont?</p>
                  <p>
                    <a href="/login" alt="register">
                      Logheaza-te
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function validateForm(values, isRegister) {
  const validation = {
    errors: {
      email: "",
      password: "",
      retype_password: "",
      firstName: "",
      lastName: "",
    },
    isValid: true,
  };

  /* eslint-disable no-control-regex*/
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  if (!values.email || !emailRegex.test(values.email)) {
    validation.isValid = false;
    validation.errors.email = "Please enter a valid email address";
  }

  if (!values.password || values.password.length < 6) {
    validation.isValid = false;
    validation.errors.password =
      "Please enter a password that is at least 6 characters long.";
  }

  if (isRegister) {
    if (values.password !== values.retype_password) {
      validation.isValid = false;
      validation.errors.retype_password = "The two passwords do not match.";
    }

    if (!values.firstName) {
      validation.isValid = false;
      validation.errors.firstName = "Please enter your first name.";
    }

    if (!values.lastName) {
      validation.isValid = false;
      validation.errors.lastName = "Please enter your last name.";
    }
  }

  return validation;
}

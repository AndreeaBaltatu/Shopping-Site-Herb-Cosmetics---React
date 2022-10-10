import { useState } from "react";
import { useAuthContext } from "./AuthContext";
import styles from "./Auth.module.css";
export function EditProfile() {
  const { user } = useAuthContext();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    poza: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    password: "",
    poza: "",
  });
  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: "" });
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const [message, setMessage] = useState("");
  const { accessToken } = useAuthContext();

  const userId = user.id;

  async function handleSubmit(e) {
    e.preventDefault();
    const validation = validateForm(values);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    await fetch("http://localhost:3000/users/" + userId, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    setMessage(`Profilul tau a fost modificat`);
  }
  return (
    <>
      <h1 className={styles["editProfileTitle"]}>Editeaza profilul </h1>
      <form onSubmit={handleSubmit} className={styles["editProfileContainer"]}>
        {message && <p className={styles["success"]}>{message}</p>}

        <p>
          <label htmlFor="lastName">Nume</label>
          <input
            className={styles["input"]}
            type="text"
            name="lastName"
            id="lastName"
            value={values.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && (
            <p className={styles["errors"]}>{errors.lastName}</p>
          )}
        </p>

        <p>
          <label htmlFor="firstName">Prenume</label>
          <input
            className={styles["input"]}
            type="text"
            name="firstName"
            id="firstName"
            value={values.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && (
            <p className={styles["errors"]}>{errors.firstName}</p>
          )}
        </p>

        <p>
          <label htmlFor="password">Parola</label>
          <input
            className={styles["input"]}
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className={styles["errors"]}>{errors.password}</p>
          )}
        </p>

        <p>
          <label htmlFor="poza">Poza</label>
          <input
            className={styles["input"]}
            type="text"
            name="poza"
            id="poza"
            value={values.poza}
            onChange={handleInputChange}
          />
        </p>

        <p>
          <button>Editeaza profilul</button>
        </p>
      </form>
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

  if (!values.password || values.password.length < 6) {
    validation.isValid = false;
    validation.errors.password =
      "Please enter a password that is at least 6 characters long.";
  }

  if (!values.firstName) {
    validation.isValid = false;
    validation.errors.firstName = "Please enter your first name.";

    if (!values.lastName) {
      validation.isValid = false;
      validation.errors.lastName = "Please enter your last name.";
    }
  }

  return validation;
}

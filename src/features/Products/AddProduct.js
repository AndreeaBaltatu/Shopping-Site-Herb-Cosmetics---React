import clsx from "clsx";
import { useState } from "react";
import { useAuthContext } from "../Auth/AuthContext";
import styles from "./Product.module.css";
export function AddProduct() {
  const [values, setValues] = useState({
    title: "",
    poza: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    poza: "",
  });

  const [message, setMessage] = useState("");
  const { accessToken, user } = useAuthContext();

  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: "" });
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...values, userId: user.id }),
    }).then((res) => res.json());

    setMessage(`Produsul ${values.title}a fost adaugat cu success!`);
  }
  return (
    <>
      <h1 className={styles["productList"]}>Adauga un produs</h1>
      <div className={styles["addProductContainer"]}>
        <form onSubmit={handleSubmit}>
          {message && <p className={styles["success"]}>{message}</p>}
          <div className={styles["label"]}>
            <label htmlFor="title">Nume</label>
          </div>
          <input
            className={errors.title && styles["errors"]}
            type="text"
            name="title"
            id="title"
            value={values.title}
            onChange={handleInputChange}
          />

          {errors.title && <p className={styles["errors"]}>{errors.title}</p>}

          <div className={styles["label"]}>
            <label htmlFor="poza">Poza</label>
          </div>
          <input
            className={errors.poza && styles["errors"]}
            type="text"
            name="poza"
            id="poza"
            value={values.poza}
            onChange={handleInputChange}
          />

          <div className={styles["label"]}>
            <label htmlFor="pret">Pret</label>
          </div>
          <input
            className={errors.pret && styles["errors"]}
            type="number"
            name="pret"
            id="pret"
            value={values.pret}
            onChange={handleInputChange}
          />

          {errors.poza && <p className={styles["label"]}>{errors.poza}</p>}
          <div className={styles["label"]}>
            <label htmlFor="ingrediente">Ingrediente</label>
          </div>
          <textarea
            id="ingrediente"
            name="ingrediente"
            rows="4"
            cols="50"
            value={values.ingrediente}
            onChange={handleInputChange}
          ></textarea>
          <div className={styles["label"]}>
            <label htmlFor="ingrediente">Beneficii</label>
          </div>
          <textarea
            id="beneficii"
            name="beneficii"
            rows="4"
            cols="50"
            value={values.beneficii}
            onChange={handleInputChange}
          ></textarea>
          <div className={styles["label"]}>
            <label for="gramaj"> Alege Gramajul</label>
            <select
              className={clsx("border rounded border-black ml-1", {
                "border-red-800": errors.poza,
              })}
              type="select"
              name="gramaj"
              id="gramaj"
              value={values.gramaj}
              onChange={handleInputChange}
            >
              <option value="10">10 ml</option>
              <option value="30">30 g</option>
              <option value="60">60 g</option>
              <option value="100">50 g</option>
            </select>
          </div>
          <div className={styles["removeBG"]}>
            <button className={styles["btnAdauga"]}>Adauga un produs</button>
          </div>
        </form>
      </div>
    </>
  );
}

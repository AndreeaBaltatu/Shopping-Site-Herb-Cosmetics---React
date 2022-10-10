import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../Auth/AuthContext";
import styles from "./Product.module.css";

export function EditProduct() {
  const [values, setValues] = useState({
    title: "",
    poza: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    poza: "",
  });

  const { productId } = useParams();
  useEffect(() => {
    fetch("http://localhost:3000/products/" + productId)
      .then((res) => res.json())
      .then((data) => setValues(data));
  }, [productId]);

  const [message, setMessage] = useState("");
  const { accessToken } = useAuthContext();

  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: "" });
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("http://localhost:3000/products/" + values.id, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    setMessage(`Produsul ${values.title} a fost modificat`);
  }
  return (
    <>
      <h1 className={styles["edith1"]}>Editeaza produsul {values.title}</h1>
      <form onSubmit={handleSubmit} className={styles["editProduct"]}>
        {message && (
          <p className="mt-1 text-red-800 bg-red-300 rounded w-96 m-auto p-3">
            {message}
          </p>
        )}

        <label htmlFor="title" className={styles["editProductLabel"]}>
          Nume
        </label>
        <input
          className={styles["input"]}
          type="text"
          name="title"
          id="title"
          value={values.title}
          onChange={handleInputChange}
        />

        {errors.title && <p className="mt-1 text-red-800">{errors.title}</p>}

        <label htmlFor="poza">Poza</label>
        <input
          className={styles["input"]}
          type="text"
          name="poza"
          id="poza"
          value={values.poza}
          onChange={handleInputChange}
        />

        {errors.poza && <p className="mt-1 poza-red-800">{errors.poza}</p>}

        <label htmlFor="ingrediente">Ingrediente</label>
        <input
          className={styles["input"]}
          type="text"
          name="ingrediente"
          id="ingrediente"
          value={values.ingrediente}
          onChange={handleInputChange}
        />

        {errors.ingrediente && (
          <p className="mt-1 poza-red-800">{errors.ingrediente}</p>
        )}

        <label htmlFor="beneficii">Beneficii</label>
        <input
          className={styles["input"]}
          type="text"
          name="beneficii"
          id="beneficii"
          value={values.beneficii}
          onChange={handleInputChange}
        />

        {errors.beneficii && (
          <p className="mt-1 poza-red-800">{errors.beneficii}</p>
        )}

        <label htmlFor="pret">Pret</label>
        <input
          className={styles["input"]}
          type="number"
          name="pret"
          id="pret"
          value={values.pret}
          onChange={handleInputChange}
        />

        {errors.pret && <p className="mt-1 poza-red-800">{errors.pret}</p>}

        <label htmlFor="gramaj">Gramaj</label>
        <input
          className={styles["input"]}
          type="text"
          name="gramaj"
          id="gramaj"
          value={values.gramaj}
          onChange={handleInputChange}
        />

        {errors.gramaj && <p className="mt-1 poza-red-800">{errors.gramaj}</p>}

        <p>
          <button className={styles["ProductCart"]}>Editeaza produsul</button>
        </p>
      </form>
    </>
  );
}

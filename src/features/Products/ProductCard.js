import { Link } from "react-router-dom";

import styles from "./Product.module.css";

export function ProductCard({ produs, handleClick }) {
  return (
    <article className={styles["product_box"]}>
      <Link to={`/products/${produs.id}`}>
        <img
          className={styles["productImages"]}
          src={produs.poza}
          alt={`${produs.title} poza`}
        />{" "}
      </Link>
      <h2 className={styles["ProductTitle"]}>{produs.title} </h2>
      <div className={styles["ProductPrice"]}>Pret: {produs.pret} lei</div>
      <div className={styles["ProductGramaj"]}>Gramaj: {produs.gramaj}</div>
      <button
        onClick={() => handleClick(produs)}
        className={styles["ProductCart"]}
      >
        Adauga in cos
      </button>
    </article>
  );
}

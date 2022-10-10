import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Product.module.css";
import { useAuthContext } from "../Auth/AuthContext";

export function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [modalVisibility, setmodalVisibility] = useState(false);
  const { accessToken, user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/products/" + productId)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productId]);

  if (!product) {
    return <strong>Loading...</strong>;
  }

  async function handleDeleteProduct() {
    await fetch("http://localhost:3000/products/" + product.id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    navigate("/products");
  }
  function openModal() {
    setmodalVisibility(true);
    console.log("openModal");
  }
  function closeModal() {
    setmodalVisibility(false);
    console.log("closeModal");
  }

  return (
    <>
      <section className={styles["detailsContainer"]}>
        <h1>{product.title}</h1>

        <img
          className={styles["detailsImage"]}
          src={product.poza}
          alt={` Poza ${product.title}`}
        />
        <p>Gramaj: {product.gramaj} </p>
        <p>Ingrediente: {product.ingrediente}</p>
        <p>Beneficii: {product.beneficii}</p>
        <p>Pret: {product.pret} lei</p>
        <button className={styles["ProductCart"]}>
          Adauga in cos{" "}
          <FontAwesomeIcon
            icon={solid("shopping-basket")}
            className={styles["icons"]}
          />
        </button>
        {user && (
          <button onClick={openModal} className={styles["ProductCart"]}>
            Sterge produsul{" "}
            <FontAwesomeIcon
              icon={solid("trash")}
              className={styles["icons"]}
            />
          </button>
        )}

        {user && (
          <button className={styles["borderNone"]}>
            <a
              href={`/products/edit/${product.id}`}
              className={styles["ProductCart"]}
            >
              Editeaza produsul
            </a>
          </button>
        )}
      </section>
      <footer className={styles["footerContainer"]}>
        <div>
          <a href="/products">Lista Produse</a>
        </div>
        <div>
          <a href="/contact">Contact</a>
        </div>
        <div>
          <a href="http://www.anpc.gov.ro/">Protectia Consumatorilor</a>
        </div>
        <div>
          <a href="https://afir.info/">AFIR</a>
        </div>
        <div>
          <a href="https://www.facebook.com/HerbCosmeticsbyRaluca">
            Follow us on Facebook
          </a>
        </div>
        <div>
          <a href="https://www.facebook.com/HerbCosmeticsbyRaluca">
            Follow us on Instagram
          </a>
        </div>
      </footer>
      <div className={modalVisibility ? styles["modal"] : styles["modalNone"]}>
        <div className={styles["modalBox"]}>
          <p>Esti sigur ca vrei sa stergi produsul {product.title} ?</p>
          <div className={styles["buttons"]}>
            <button onClick={handleDeleteProduct} className={styles["Yes"]}>
              Sterge
            </button>
            <button onClick={closeModal} className={styles["No"]}>
              Anuleaza
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import { useAuthContext } from "../Auth/AuthContext";
import styles from "./Product.module.css";
export function ShoppingCart() {
  const { user } = useAuthContext();
  const [productList, setproductList] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [counter, setCounter] = useState(0);

  function handleClickIncrease(id, index) {
    if (index === id) {
      setCounter(counter + 1);
    }
  }
  function handleClickDecrease(product) {
    setCounter(counter - 1);
  }
  if (counter === 0) {
    setCounter(counter + 1);
  }

  function deleteProduct(id) {
    console.log("id", id);
    let afterFilter = productList.filter((product, index) => index !== id);
    setproductList(afterFilter);
    localStorage.setItem("cart", JSON.stringify(productList));
  }
  console.log("productList", productList);

  return (
    <article>
      <h3>Cosul tau de cumparaturi:</h3>
      {productList.map((product, id) => (
        <div
          className={styles["shoppingCart"]}
          key={product.id}
          product={product}
        >
          <img
            src={product.poza}
            alt={product.title}
            className={styles["shoppingCartIMG"]}
          />
          <p>{product.title}</p>
          <p>{product.id}</p>
          <p>{product.pret} lei</p>

          <button key={product.id} onClick={() => deleteProduct(id)}>
            Sterge produs
          </button>
          <button onClick={() => handleClickDecrease(id)}>-</button>
          <p>{counter}</p>
          <button onClick={() => handleClickIncrease(product.id)}>+</button>
        </div>
      ))}
      {user && (
        <>
          <div className={styles["cartButtons"]}>
            <a href="/products">
              <button>Continua cumparaturile</button>
            </a>
            <a href="/">
              <button>Comanda</button>
            </a>
          </div>
        </>
      )}
      {!user && (
        <>
          <div className={styles["cartButtons"]}>
            <a href="/products">
              <button>Continua cumparaturile</button>
            </a>
            <a href="/login">
              <button>Logheaza-te pentru a comanda</button>
            </a>
          </div>
        </>
      )}
    </article>
  );
}

import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Auth/AuthContext";

const options = [
  {
    label: "Toate",
    value: "toate",
  },
  {
    label: "Creme",
    value: "creme",
  },
  {
    label: "Sapun",
    value: "sapun",
  },
  {
    label: "Altele",
    value: "altele",
  },
];

export function ProductList() {
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const { user } = useAuthContext();

  const [shoppingCart, setShoppingCart] = useState([]);

  const handleClick = (product) => {
    shoppingCart.push(product);
    console.log(shoppingCart);
    localStorage.setItem("cart", JSON.stringify(shoppingCart));
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/products?_limit=20")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  if (!products) {
    return <strong>Loading..</strong>;
  }

  const onFilter = (e) => {
    if (e.target.value === "toate") {
      setFilteredProducts(products);
    } else {
      const result = products.filter(
        (product) => product.categorie === e.target.value
      );
      setFilteredProducts(result);
    }
  };

  return (
    <>
      <section className={styles["productList"]}>
        <h1>Produse</h1>
        <div className={styles["filtruContainer"]}>
          <label htmlFor="categorie">Categorie</label>
          <select onChange={onFilter}>
            {options.map((option, index) => (
              <option key={`${option.label}-${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {user && (
          <Link to="/products/add" className={styles["addBTN"]}>
            Adauga un produs
          </Link>
        )}
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            produs={product}
            shoppingCart={shoppingCart}
            setshoppingCart={setShoppingCart}
            handleClick={handleClick}
          />
        ))}
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
    </>
  );
}

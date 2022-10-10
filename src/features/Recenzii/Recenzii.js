import { useEffect, useState } from "react";

import styles from "./Recenzii.module.css";

export function Recenzii() {
  const [recenzii, setRecenzii] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/recenzii?_limit=20")
      .then((res) => res.json())
      .then((data) => setRecenzii(data));
  }, []);

  if (!recenzii) {
    return <strong>Loading..</strong>;
  }
  return (
    <>
      <div className="app">
        {recenzii &&
          recenzii.map((recenzie) => (
            <div className={styles["recenziiContainer"]}>
              <img
                src="https://www.w3schools.com/howto/img_avatar2.png"
                alt="userpic"
                className={styles["recenziiUserPic"]}
              />

              <div className="">
                {recenzie.firstName}&nbsp;
                {recenzie.lastName}
              </div>

              <div className="">{recenzie.recenzie}</div>
            </div>
          ))}
      </div>
      <div className="margin"></div>
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

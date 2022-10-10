import styles from "./Contact.module.css";
import { useState } from "react";
import { useAuthContext } from "../Auth/AuthContext";
export function Contact() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    recenzie: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    recenzie: "",
  });
  const [message, setMessage] = useState("");

  const { accessToken, user } = useAuthContext();
  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: "" });
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const data = await fetch("http://localhost:3000/recenzii", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    setMessage(`Multumim pentru recenzia acordata ${user.firstName}!`);
  }

  return (
    <>
      <div>
        {user && (
          <main className={styles["grid"]}>
            <form
              onSubmit={handleSubmit}
              className={styles["recenzieContainer"]}
            >
              <h3>Lasa-ne o recenzie</h3>
              <label htmlFor="lastName">Nume</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={values.lastName}
                onChange={handleInputChange}
              ></input>
              <label htmlFor="firstName">Prenume</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={values.firstName}
                onChange={handleInputChange}
              ></input>
              <label htmlFor="recenzie">Scrie o recenzie</label>
              <textarea
                type="text"
                name="recenzie"
                id="recenzie"
                value={values.recenzie}
                onChange={handleInputChange}
                rows="19"
                cols="50"
              ></textarea>

              {user && message && (
                <p className={styles["recenzieSuccess"]}>{message}</p>
              )}
              <button className={styles["buttonTrimiteRecenzie"]}>
                Trimite recenzia
              </button>
            </form>

            <div className={styles["contactContainer"]}>
              <h1>Contacteaza-ne</h1>
              <p>Locatie:</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2344.3145413309226!2d25.60855326620366!3d45.673398964237606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35beee1d032e5%3A0x21aa107548d22458!2sStrada%20Ioan%20Ursu%2010%2C%20Bra%C8%99ov%20500170!5e0!3m2!1sro!2sro!4v1660131047974!5m2!1sro!2sro"
                title="adress"
                width="600"
                height="450"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
              <h4>Herb Cosmetics</h4>
              <p>
                Email:{" "}
                <a href="mailto:raluca.barbuta@gmail.com">
                  raluca.barbuta@gmail.com
                </a>
              </p>
              <p>
                {" "}
                Telefon: <a href="telto:0757088840">0757.088.840</a>
              </p>
              <p>Adresa: Strada Ioan Ursu nr. 10, Brasov</p>
            </div>
          </main>
        )}
        {!user && (
          <main className={styles["flex"]}>
            <div className={styles["contactContainer"]}>
              <h1>Contacteaza-ne</h1>
              <p>Locatie:</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2344.3145413309226!2d25.60855326620366!3d45.673398964237606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35beee1d032e5%3A0x21aa107548d22458!2sStrada%20Ioan%20Ursu%2010%2C%20Bra%C8%99ov%20500170!5e0!3m2!1sro!2sro!4v1660131047974!5m2!1sro!2sro"
                title="adress"
                width="600"
                height="450"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
              <h4>Herb Cosmetics</h4>
              <p>
                Email:{" "}
                <a href="mailto:raluca.barbuta@gmail.com">
                  raluca.barbuta@gmail.com
                </a>
              </p>
              <p>
                {" "}
                Telefon: <a href="telto:0757088840">0757.088.840</a>
              </p>
              <p>Adresa: Strada Ioan Ursu nr. 10, Brasov</p>
            </div>
          </main>
        )}
      </div>
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

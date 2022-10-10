import clsx from "clsx";
import styles from "./Home.module.css";
export function Home() {
  return (
    <>
      <div className={styles["removeBG"]}>
        <img
          src="https://i.imgur.com/HkOAAbL.png"
          alt="logo"
          className={styles["homeLogo"]}
        ></img>
      </div>
      <div className={styles["descriereContainer"]}>
        <h1 className={clsx(styles.red)}>Povestea noastra</h1>
        <h2 className={clsx(styles.red)}>
          Cosmetice 100% handmade, din ingrediente naturale
        </h2>

        <img
          src="https://i.imgur.com/ji8t7J3.jpg"
          alt="logo"
          className={styles["homePicture"]}
        ></img>
        <div className={styles["homeDescriere"]}>
          <p>Numele meu este Raluca Barbuta si reprezint Herb Cosmetics.</p>
          <p>
            Herb Cosmetics este un proiect pe care l-am inceput din iubirea
            pentru natura.
          </p>
          <p>
            Satisfacția de a cumpăra un produs direct din mâinile care l-au
            produs este de nedescris. Va oferim, așadar, la rândul nostru,
            săpunuri și cosmetice de calitate superioară; un săpun realizat
            exclusiv din ingrediente naturale: uleiuri și unturi vegetale (ulei
            de măsline, unt de cocos, unt de shea, cacao, ricin, etc.), argile,
            sucuri și pulpă de fructe, plante, iar ingredientul de... aur
            folosit pentru a aduce un parfum natural 100%, unic și prețios este
            uleiul esențial.
          </p>
          <p>
            Săpunurile sunt realizate prin metoda la rece, uleiurile nu se
            fierb, păstrandu-și astfel toate proprietățile. Rezultatul este un
            săpun care curăță dar nu usucă pielea cu un parfum discret, elegant,
            natural. Fiecare etapă, începând de la realizarea rețetelor,
            macerarea plantelor, combinarea ingredientelor, tăierea și
            împachetarea fiecărui săpun este realizată... cu mâna noastră. Putem
            spune că nicio bucată nu este identică cu alta! Împrumutăm, astfel,
            fiecărui sapun, o parte din noi. Cremele de fata Artissana sunt
            create special din cele mai prețioase uleiuri vegetale extravirgine,
            ape florale cu efecte benefice pentru fiecare tip de ten în parte,
            cu active cosmetice nobile cu proprietăți remarcabile pentru un ten
            hidratat, luminos, sănătos. Nu conțin parfumuri chimice sau
            coloranți artificiali.
          </p>
        </div>
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
      </footer>
    </>
  );
}

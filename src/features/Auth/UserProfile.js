import { useAuthContext } from "./AuthContext";
import styles from "./Auth.module.css";
export function UserProfile() {
  const { user } = useAuthContext();

  if (!user.poza) {
    return (
      <>
        <p className={styles["welcomeMsg"]}>Welcome ! {user.firstName}</p>
        <article className={styles["profileContainer"]}>
          <img
            src="https://www.w3schools.com/howto/img_avatar2.png"
            alt={`${user.poza} poza`}
          />
          <div>{user.lastName}</div>
          <div>{user.firstName}</div>
          <a href="/editprofile" alt="">
            <button>Edit profile</button>
          </a>
        </article>
      </>
    );
  }

  if (user.poza) {
    return (
      <>
        <article className={styles["profileContainer"]}>
          <p className={styles["welcomeMSG"]}>Welcome! {user.firstName}</p>
          <img src={user.poza} alt={`${user.firstName} poza`} />
          <div>{user.lastName}</div>
          <div>{user.firstName}</div>
          <a href="/editprofile" alt="">
            <button>Edit profile</button>
          </a>
        </article>
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
            <input
              type="text"
              id="myInput"
              onkeyup="myFunction()"
              placeholder="Cautati produse.."
              title="Type in a name"
            />
          </div>
        </footer>
      </>
    );
  }
}

import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import { useAuthContext } from "../../features";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
export function Nav() {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  return (
    <nav className={styles["mainMenu"]}>
      <ul>
        <li className={styles["center"]}>
          <NavLink className={styles["NavButtons"]} to="/home">
            Home
          </NavLink>
        </li>
        <li className={styles["center"]}>
          <NavLink className={styles["NavButtons"]} to="/products">
            Produse
          </NavLink>
        </li>
        <li className={styles["center"]}>
          <NavLink className={styles["NavButtons"]} to="/contact">
            Contact
          </NavLink>
        </li>

        <li className={styles["center"]}>
          <NavLink className={styles["NavButtons"]} to="/recenzii">
            Recenzii
          </NavLink>
        </li>

        {user && (
          <li className={styles["pushRight"]}>
            {/* <span className={styles["pushRightText"]}>
              {" "}
              Welcome, {user.firstName}!{" "}
            </span> */}
            <a
              className={styles["NavButtons"]}
              href="/home"
              onClick={(e) => {
                e.preventDefault();
                navigate("/home");
                logout();
              }}
            >
              Logout
            </a>
          </li>
        )}

        {user && (
          <>
            <li>
              <NavLink className={styles["NavButtons"]} to="/profile">
                Profil
              </NavLink>
            </li>
            <li className={styles["shoppingBag"]}>
              <a href="/shoppingcart">
                <FontAwesomeIcon
                  icon={solid("shopping-basket")}
                  className={styles["shoppingIcon"]}
                />
              </a>
            </li>
          </>
        )}

        {!user && (
          <>
            <li className={styles["pushRight"]}>
              <NavLink className={styles["NavButtons"]} to="/login">
                Login
              </NavLink>
            </li>
            <li className={styles["mainMenu"]}>
              <NavLink className={styles["NavButtons"]} to="/register">
                Register
              </NavLink>
            </li>

            <li className={styles["shoppingBag"]}>
              <a href="/shoppingcart">
                <FontAwesomeIcon
                  icon={solid("shopping-basket")}
                  className={styles["shoppingIcon"]}
                />
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

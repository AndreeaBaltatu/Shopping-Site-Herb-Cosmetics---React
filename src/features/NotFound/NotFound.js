import styles from "./NotFound.module.css";

export function NotFound() {
  return (
    <>
      <main className={styles["container"]}>
        <h1>404 - Not Found</h1>
        <img src="https://i.imgur.com/e08Oqug.png" alt="404" />
        <div>Opps! Aceasta pagina nu exista!</div>
        <div>
          Go back to <a href="/Home">Home</a>
        </div>
      </main>
    </>
  );
}

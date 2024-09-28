import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/Header/HeaderComponent";
import ClaimComponent from "../components/Claim/ClaimComponent";


export default function Swap() {
  
  return (
    <div className={`${styles.fullscreenBg} `}>
      <header>
        <HeaderComponent />
      </header>
      <main className={`${styles.main}`}>
          <div
            className={`flex flex-col justify-top mx-auto text-center`}
            style={{ fontFamily: "Mandalore" }}
          >
           <ClaimComponent />
          </div>
      </main>
    </div>
  );
}

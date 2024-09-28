import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/Header/HeaderComponent";
import MainPage from "../components/MainPage";


const Home: NextPage = () => {

  return (
    <div className={`${styles.fullscreenBg}`}>
      <header>
        <HeaderComponent />
      </header>
      <main className={`${styles.main} `}>
        <MainPage/>
      </main>
    </div>
  );
};

export default Home;




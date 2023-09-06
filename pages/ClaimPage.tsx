
import ClaimComponent from "../components/Claim/ClaimComponent";
import HeaderComponent from "../components/Header/HeaderComponent";

export default function StakeComponent() {
  return <main>
  <header>
    {" "}
    <HeaderComponent></HeaderComponent>
  </header>{" "}
  
  <div className="min-h-screen grid sm:grid-cols-2 w-full">
      <div className="bg-blue-500 p-4 w-full">
        <ClaimComponent/>
        </div>
    </div>
  
</main>
}

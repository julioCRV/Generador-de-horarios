import HorarioOrganizador from "./components/HorarioOrganizador";
import Header from "./components/Header";
import HeaderComplemento from "./components/HeaderComplemento";
import Footer from "./components/Footer";
import './App.css'

function App() {
  return (
    <div className="main">
      <Header />
      <HeaderComplemento />
      <main style={{ padding: "20px" }}>
        <HorarioOrganizador />
      </main>
      <Footer />
    </div>
  );
}

export default App;




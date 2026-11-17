import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <div className="bg-hueso text-negro min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <ProductList />
      {/* Aquí irá la sección del clima (id="clima") */}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;

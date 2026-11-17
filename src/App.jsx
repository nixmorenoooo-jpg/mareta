import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import Clima from "./components/Clima";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <div className="bg-hueso text-negro min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <ProductList />
      <Clima />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
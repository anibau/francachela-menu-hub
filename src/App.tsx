import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import ProductosPage from "./pages/ProductosPage";
import CombosPage from "./pages/CombosPage";
import PuntosPage from "./pages/PuntosPage";
import RecetarioPage from "./pages/RecetarioPage";
import ContactoPage from "./pages/ContactoPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/combos" element={<CombosPage />} />
          <Route path="/puntos" element={<PuntosPage />} />
          <Route path="/recetario" element={<RecetarioPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

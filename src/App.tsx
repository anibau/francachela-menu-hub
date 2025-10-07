import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/francachela" element={<Home />} />
          <Route path="/francachela/productos" element={<ProductosPage />} />
          <Route path="/francachela/combos" element={<CombosPage />} />
          <Route path="/francachela/puntos" element={<PuntosPage />} />
          <Route path="/francachela/recetario" element={<RecetarioPage />} />
          <Route path="/francachela/contacto" element={<ContactoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

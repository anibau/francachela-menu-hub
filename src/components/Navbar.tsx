import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Wine } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  const links = [
    { path: '/francachela', label: 'Inicio' },
    { path: '/francachela/productos', label: 'Productos' },
    { path: '/francachela/combos', label: 'Combos' },
    { path: '/francachela/puntos', label: 'Puntos' },
    { path: '/francachela/recetario', label: 'Recetario' },
    { path: '/francachela/contacto', label: 'Contacto' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/francachela" className="flex items-center gap-2 font-bold text-xl">
            <Wine className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Francachela
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Button
                key={link.path}
                asChild
                variant={location.pathname === link.path ? 'default' : 'ghost'}
              >
                <Link to={link.path}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

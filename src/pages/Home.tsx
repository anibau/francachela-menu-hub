import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wine, Gift, BookOpen, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Bienvenido a{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Francachela
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Tu tienda premium de bebidas y cócteles. Descubre los mejores productos, 
              combos exclusivos y recetas para tus celebraciones.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="text-lg">
                <Link to="/francachela/productos">Explorar Productos</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link to="/francachela/recetario">Ver Recetas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/francachela/productos" className="group">
              <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300">
                <Wine className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-xl mb-2">Productos</h3>
                <p className="text-muted-foreground">
                  Amplio catálogo de bebidas premium y accesorios
                </p>
              </div>
            </Link>

            <Link to="/francachela/combos" className="group">
              <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300">
                <Gift className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-xl mb-2">Combos</h3>
                <p className="text-muted-foreground">
                  Paquetes especiales con los mejores precios
                </p>
              </div>
            </Link>

            <Link to="/francachela/puntos" className="group">
              <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300">
                <Star className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-xl mb-2">Puntos</h3>
                <p className="text-muted-foreground">
                  Canjea tus puntos por productos exclusivos
                </p>
              </div>
            </Link>

            <Link to="/francachela/recetario" className="group">
              <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300">
                <BookOpen className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-xl mb-2">Recetario</h3>
                <p className="text-muted-foreground">
                  Descubre las mejores recetas de cócteles
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center space-y-6 p-8 rounded-xl border bg-gradient-to-br from-primary/10 to-accent/10">
            <h2 className="text-3xl md:text-4xl font-bold">
              ¿Listo para la fiesta?
            </h2>
            <p className="text-lg text-muted-foreground">
              Encuentra todo lo que necesitas para hacer de tu celebración un momento inolvidable
            </p>
            <Button asChild size="lg" className="text-lg">
              <a 
                href="https://wa.me/519XXXXXXXX?text=Hola,%20me%20interesa%20obtener%20más%20información%20sobre%20sus%20productos." 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Contáctanos por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

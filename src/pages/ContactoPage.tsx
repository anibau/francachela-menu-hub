import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ContactoPage = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Contáctanos</h1>
          <p className="text-lg text-muted-foreground">
            Estamos aquí para ayudarte. Contáctanos por cualquiera de estos medios
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-muted-foreground">contacto@francachela.com</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Respuesta en 24-48 horas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Teléfono</h3>
                  <p className="text-muted-foreground">+51 951 756 070</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Lun-Vie 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Dirección</h3>
                  <p className="text-muted-foreground">
                    Av. Principal 123<br />
                    Colonia Centro<br />
                    Ciudad, Estado, CP 12345
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Horario</h3>
                  <p className="text-muted-foreground">
                    Lunes - Viernes: 9:00 AM - 8:00 PM<br />
                    Sábado: 10:00 AM - 6:00 PM<br />
                    Domingo: Cerrado
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">¿Tienes preguntas?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              No dudes en contactarnos. Nuestro equipo está listo para ayudarte 
              con cualquier consulta sobre nuestros productos, pedidos o entregas.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactoPage;

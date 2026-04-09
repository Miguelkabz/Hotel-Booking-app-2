import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Twitter, 
  MapPin, 
  Phone, 
  Clock, 
  Calendar as CalendarIcon,
  Utensils,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Menu", href: "#menu" },
  { name: "About", href: "#about" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

const FEATURED_ITEMS = [
  {
    name: "Wild Mushroom Risotto",
    description: "Arborio rice, porcini mushrooms, truffle oil, aged parmesan.",
    price: "$28",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Pan-Seared Scallops",
    description: "Hokkaido scallops, cauliflower purée, crispy pancetta, lemon butter.",
    price: "$34",
    image: "https://images.unsplash.com/photo-1532639113876-061862aba8ff?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Herb-Crusted Lamb Rack",
    description: "Grass-fed lamb, mint pea purée, roasted root vegetables, red wine jus.",
    price: "$42",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Deconstructed Lemon Tart",
    description: "Lemon curd, shortbread crumble, toasted meringue, raspberry coulis.",
    price: "$16",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=800&auto=format&fit=crop"
  }
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550966842-28c446646cc7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=800&auto=format&fit=crop"
];

export default function RestaurantSite() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [date, setDate] = useState<Date>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("2");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const handleReservation = () => {
    if (!name || !date) return;
    setIsSubmitted(true);
  };

  const resetReservation = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      // Small delay to prevent flickering during close animation
      setTimeout(() => {
        setIsSubmitted(false);
        setName("");
        setGuests("2");
        setDate(undefined);
      }, 300);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 flex items-center justify-between",
          isScrolled ? "bg-background/80 backdrop-blur-md border-bottom border-border py-3" : "bg-transparent"
        )}
      >
        <div className="flex items-center gap-2">
          <Utensils className="w-6 h-6" />
          <span className="text-2xl font-serif tracking-tighter font-bold">L'ESSENCE</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm uppercase tracking-widest font-medium hover:text-primary/60 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Dialog open={isDialogOpen} onOpenChange={resetReservation}>
            <DialogTrigger render={<Button variant="outline" className="rounded-none border-primary uppercase tracking-widest text-xs px-8" />}>
              Reservations
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <DialogHeader>
                      <DialogTitle className="font-serif text-2xl">Book a Table</DialogTitle>
                      <DialogDescription>
                        Join us for an unforgettable culinary experience.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          placeholder="Your name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Date</Label>
                        <Popover>
                          <PopoverTrigger render={
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            />
                          }>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="guests">Guests</Label>
                        <Input 
                          id="guests" 
                          type="number" 
                          min="1" 
                          max="10" 
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button 
                      className="w-full rounded-none uppercase tracking-widest"
                      onClick={handleReservation}
                      disabled={!name || !date}
                    >
                      Confirm Reservation
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-6"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Star className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif">Thank You, {name}!</h3>
                      <p className="text-muted-foreground">
                        Your table for {guests} is reserved for {date ? format(date, "MMMM do") : ""}.
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      A confirmation email has been sent to your inbox.
                    </p>
                    <Button 
                      variant="outline" 
                      className="rounded-none uppercase tracking-widest w-full"
                      onClick={() => resetReservation(false)}
                    >
                      Close
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <MenuIcon className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-8 mt-12">
                {NAV_LINKS.map((link) => (
                  <SheetClose key={link.name} nativeButton={false} render={
                    <a 
                      href={link.href}
                      className="text-2xl font-serif tracking-tight hover:text-primary/60 transition-colors"
                    >
                      {link.name}
                    </a>
                  } />
                ))}
                <Button 
                  className="rounded-none uppercase tracking-widest mt-4"
                  onClick={() => {
                    setIsDialogOpen(true);
                  }}
                >
                  Reservations
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop" 
            alt="Restaurant Interior" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-white/80 uppercase tracking-[0.4em] text-xs font-medium mb-4 block">
              Culinary Excellence Since 1998
            </span>
            <h1 className="text-6xl md:text-8xl text-white font-serif mb-8 leading-tight">
              The Art of <br /> <span className="italic">Fine Dining</span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#menu">
                <Button size="lg" className="rounded-none bg-white text-black hover:bg-white/90 px-10 py-7 text-sm uppercase tracking-widest">
                  Explore Menu
                </Button>
              </a>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-none border-white text-white hover:bg-white hover:text-black px-10 py-7 text-sm uppercase tracking-widest"
                onClick={() => setIsDialogOpen(true)}
              >
                Book a Table
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-[1px] h-16 bg-white/30 mx-auto" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-grid-cols-2 gap-16 items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] overflow-hidden rounded-none"
            >
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop" 
                alt="Chef at work" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-8 -right-8 bg-background p-8 hidden md:block border border-border">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-serif font-bold">25</div>
                <div className="text-xs uppercase tracking-widest leading-tight">
                  Years of <br /> Experience
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-primary/60 uppercase tracking-widest text-xs font-bold">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                Crafting Unforgettable <br /> <span className="italic text-primary/80">Flavors & Memories</span>
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              L'Essence was born from a passion for seasonal ingredients and traditional techniques reimagined for the modern palate. Our philosophy is simple: source the finest local produce and let the natural flavors shine.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every dish tells a story of heritage, innovation, and the pursuit of culinary perfection. From our hand-picked wine cellar to our meticulously crafted tasting menus, we invite you to experience the essence of fine dining.
            </p>
            <Button variant="link" className="p-0 h-auto text-primary uppercase tracking-widest text-xs font-bold group">
              Read More About Us <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section id="menu" className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-4">
            <span className="text-primary/60 uppercase tracking-widest text-xs font-bold">Seasonal Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif">Featured Dishes</h2>
            <div className="w-24 h-[1px] bg-primary/20 mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_ITEMS.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="rounded-none border-none bg-transparent overflow-hidden group">
                  <div className="aspect-square overflow-hidden mb-6 relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <Button variant="outline" className="rounded-none border-white text-white hover:bg-white hover:text-black uppercase tracking-widest text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-0 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-serif font-medium">{item.name}</h3>
                      <span className="text-primary font-medium">{item.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button variant="outline" className="rounded-none border-primary uppercase tracking-widest px-12 py-6">
              View Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "overflow-hidden group cursor-pointer",
                  index === 0 && "md:col-span-2 md:row-span-2",
                  index === 3 && "md:col-span-2"
                )}
              >
                <img 
                  src={img} 
                  alt={`Gallery ${index}`} 
                  className="w-full h-full object-cover aspect-square md:aspect-auto group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Reservation Section */}
      <section id="contact" className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif">Get in Touch</h2>
                <p className="text-muted-foreground">We'd love to hear from you. Whether you have a question about our menu or want to book a private event.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <MapPin className="w-5 h-5" />
                    <span className="uppercase tracking-widest text-xs font-bold">Location</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    123 Culinary Avenue<br />
                    Gourmet District, NY 10012
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Phone className="w-5 h-5" />
                    <span className="uppercase tracking-widest text-xs font-bold">Contact</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    +1 (555) 123-4567<br />
                    hello@lessence.com
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Clock className="w-5 h-5" />
                    <span className="uppercase tracking-widest text-xs font-bold">Hours</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Mon - Thu: 5pm - 10pm<br />
                    Fri - Sun: 12pm - 11pm
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Star className="w-5 h-5" />
                    <span className="uppercase tracking-widest text-xs font-bold">Social</span>
                  </div>
                  <div className="flex gap-4">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                  </div>
                </div>
              </div>
            </div>

            <Card className="rounded-none border-none shadow-xl p-8 md:p-12">
              <AnimatePresence mode="wait">
                {!isContactSubmitted ? (
                  <motion.form 
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setIsContactSubmitted(true);
                    }}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Name</Label>
                        <Input id="contact-name" required className="rounded-none border-border" placeholder="Your Name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email</Label>
                        <Input id="contact-email" required type="email" className="rounded-none border-border" placeholder="Your Email" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" required className="rounded-none border-border" placeholder="How can we help?" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" required className="rounded-none border-border min-h-[150px]" placeholder="Your message..." />
                    </div>
                    <Button type="submit" className="w-full rounded-none uppercase tracking-widest py-6">Send Message</Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Star className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif">Message Sent</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. Our team will get back to you shortly.
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="rounded-none uppercase tracking-widest"
                      onClick={() => setIsContactSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5" />
            <span className="text-xl font-serif tracking-tighter font-bold">L'ESSENCE</span>
          </div>
          
          <div className="flex gap-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-xs uppercase tracking-widest font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            © 2026 L'Essence. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Sparkles, 
  User, 
  MapPin, 
  Clock, 
  CreditCard, 
  Banknote, 
  Menu, 
  X, 
  ChevronRight,
  Heart,
  Zap,
  Star
} from 'lucide-react';

const SERVICES = [
  {
    id: 'swedish',
    name: 'Massage Suédois',
    description: 'Un massage classique pour détendre les muscles et améliorer la circulation.',
    price: '90€',
    duration: '1h',
    icon: <Heart className="w-5 h-5" />
  },
  {
    id: 'sport',
    name: 'Massage Sportif',
    description: 'Idéal pour la récupération musculaire et la préparation physique.',
    price: '90€',
    duration: '1h',
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: 'tantric',
    name: 'Massage Tantrique',
    description: 'Une expérience unique et inoubliable pour une connexion profonde avec soi-même.',
    price: '200€',
    duration: '1h30',
    special: true,
    icon: <Sparkles className="w-5 h-5" />
  }
];

const REVIEWS = [
  {
    id: 1,
    name: "Sophie",
    location: "Monaco",
    text: "Une expérience sensorielle absolument hors du temps. Juan possède une maîtrise rare qui allie puissance et douceur. Un moment d'évasion totale dans un respect absolu.",
    rating: 5
  },
  {
    id: 2,
    name: "Isabelle",
    location: "Cannes",
    text: "Le massage tantrique a été une véritable révélation. Juan sait créer un espace de confiance et de sérénité. Son professionnalisme est exemplaire, je recommande vivement.",
    rating: 5
  },
  {
    id: 3,
    name: "Elena",
    location: "Nice",
    text: "Un raffinement rare sur la Côte d'Azur. Juan est un expert qui comprend parfaitement les besoins de détente profonde. Chaque séance est une parenthèse de luxe indispensable.",
    rating: 5
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-gold selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-black/90 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl font-serif tracking-[0.2em] italic text-gold"
          >
            JUAN LUXE
          </motion.div>
          
          <div className="hidden md:flex space-x-12 text-[9px] uppercase tracking-[0.4em] font-light text-white/60">
            {['accueil', 'services', 'tantrique', 'parcours', 'témoignages', 'contact'].map((item, i) => (
              <motion.a 
                key={item}
                href={`#${item === 'témoignages' ? 'temoignages' : item}`} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                className="hover:text-gold transition-colors duration-500"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <button 
            className="md:hidden text-white/80"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center space-y-12 text-2xl font-serif italic"
          >
            {['accueil', 'services', 'tantrique', 'parcours', 'témoignages', 'contact'].map((item) => (
              <motion.a 
                key={item}
                href={`#${item === 'témoignages' ? 'temoignages' : item}`} 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={() => setIsMenuOpen(false)}
                className="capitalize hover:text-gold transition-all"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={heroRef} id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black z-10" />
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1920" 
            alt="Massage de Prestige" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div style={{ opacity }} className="relative z-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span 
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.5em", opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="text-gold uppercase text-[10px] mb-10 block font-light"
            >
              Exclusivité Féminine • Monaco — Cannes
            </motion.span>
            
            <h1 className="text-6xl md:text-[11rem] font-serif italic mb-12 leading-none tracking-tighter overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                L'Art du <span className="text-gold">Désir</span>
              </motion.span>
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="block text-4xl md:text-6xl mt-6 opacity-60 font-light"
              >
                & de l'Éveil Sensoriel
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 2, delay: 1.2 }}
              className="w-32 h-px bg-gold/40 mx-auto mb-12 origin-center"
            />

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
              className="max-w-xl mx-auto text-[13px] font-light tracking-[0.2em] text-white/40 leading-relaxed italic font-serif"
            >
              Une immersion sensorielle où le luxe rencontre l'intime. <br />
              Laissez-vous transporter par des mains expertes dans un voyage hors du temps.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.8 }}
              className="mt-12"
            >
              <motion.a 
                href="https://wa.me/33622410120?text=Bonjour%20Juan,%20je%20souhaite%20réserver%20une%20séance%20de%20massage."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gold text-black px-12 py-5 rounded-full text-xs uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors duration-500"
              >
                Réserver ma séance
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-[7px] uppercase tracking-[0.6em] text-white/20 mb-6">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-gold/30 to-transparent" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif italic mb-4">Mes Massages</h2>
              <p className="text-white/40 uppercase tracking-widest text-[10px]">Tarif standard : 90€ / Heure</p>
            </div>
            <div className="hidden md:block w-1/3 h-px bg-white/10 mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {SERVICES.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`group relative p-10 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-700 rounded-2xl overflow-hidden ${service.special ? 'border-gold/30' : ''}`}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="text-gold mb-6 relative z-10"
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-2xl font-serif italic mb-4 group-hover:text-gold transition-colors relative z-10">{service.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 relative z-10">{service.description}</p>
                <div className="flex justify-between items-center pt-6 border-t border-white/5 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-xl font-serif">{service.price}</span>
                    <span className="text-[10px] uppercase tracking-widest text-white/30">{service.duration}</span>
                  </div>
                  <motion.a 
                    href={`https://wa.me/33622410120?text=Bonjour%20Juan,%20je%20souhaite%20réserver%20un%20${service.name}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gold/10 hover:bg-gold text-gold hover:text-black p-3 rounded-full transition-all duration-300"
                  >
                    <ChevronRight size={16} />
                  </motion.a>
                </div>
                {/* Subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tantric Focus Section */}
      <section id="tantrique" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4 block">Spécialité Exclusive</span>
            <h2 className="text-5xl md:text-7xl font-serif italic mb-8 leading-tight">Le Massage <br /> <span className="text-gold">Tantrique</span></h2>
            <div className="space-y-6 text-white/70 font-light leading-relaxed">
              <p>
                Le massage tantrique est bien plus qu'un simple soin corporel ; c'est un voyage sacré vers la réconciliation avec son propre corps et son énergie vitale. 
              </p>
              <p>
                Dans un cadre de respect absolu et de bienveillance, cette pratique permet de libérer les tensions émotionnelles, d'éveiller les sens et de retrouver une harmonie profonde. C'est une célébration de la féminité, une invitation à lâcher prise totalement pour renaître à soi-même.
              </p>
              <div className="pt-8">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-3xl font-serif text-gold italic">200€</span>
                  <span className="text-white/30 text-xs uppercase tracking-widest">/ 1h30 d'expérience</span>
                </div>
                <p className="text-[10px] text-white/40 italic">Une expérience unique et inoubliable, hors du temps.</p>
              </div>
              <motion.a 
                href="https://wa.me/33622410120?text=Bonjour%20Juan,%20je%20souhaite%20réserver une séance de massage tantrique."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-10 inline-flex items-center space-x-3 bg-white/5 hover:bg-gold text-white hover:text-black px-8 py-4 rounded-full border border-white/10 transition-all duration-500 group"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Réserver cette expérience</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10"
          >
            <img 
              src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1000" 
              alt="Tantric Atmosphere" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="parcours" className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/3"
          >
            <div className="relative group">
              <div className="absolute -inset-4 border border-gold/20 rounded-2xl group-hover:border-gold/40 transition-colors duration-500" />
              <div className="w-full aspect-[3/4] bg-white/[0.02] border border-white/5 rounded-xl relative z-10 flex items-center justify-center">
                <span className="text-gold font-serif italic text-lg tracking-widest opacity-60">Photos sur demande</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-2/3"
          >
            <h2 className="text-4xl md:text-6xl font-serif italic mb-8">Juan, <span className="text-gold">32 ans</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
                <div className="text-gold mb-2"><Star className="w-4 h-4" /></div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Formation</p>
                <p className="text-sm font-medium">2 ans en Thaïlande</p>
              </div>
              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
                <div className="text-gold mb-2"><Star className="w-4 h-4" /></div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Diplômes</p>
                <p className="text-sm font-medium">France & Asie</p>
              </div>
              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl sm:col-span-2">
                <div className="text-gold mb-2"><MapPin className="w-4 h-4" /></div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Secteur d'intervention</p>
                <p className="text-sm font-medium">De Monaco à Cannes • Domicile & Réception</p>
              </div>
            </div>
            <p className="text-white/70 font-light leading-relaxed text-lg italic font-serif mb-6">
              "Passionné par l'équilibre du corps et de l'esprit, j'ai consacré mon parcours à l'apprentissage des techniques ancestrales et modernes. Mon approche est athlétique mais empreinte d'une douceur infinie. Mon objectif est de vous offrir une évasion totale, où chaque geste est une intention de guérison et de relaxation."
            </p>
            <p className="text-white/40 text-xs uppercase tracking-widest leading-loose">
              Déplacements en France ou à l'international envisageables.<br />
              Me contacter pour toute demande spécifique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="temoignages" className="py-32 px-6 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4 block">Témoignages</span>
            <h2 className="text-4xl md:text-6xl font-serif italic">L'Expérience <span className="text-gold">Vécue</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="p-10 border border-white/5 bg-white/[0.02] rounded-2xl relative group"
              >
                <div className="flex mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={12} className="text-gold fill-gold mr-1" />
                  ))}
                </div>
                <p className="text-white/60 text-sm italic leading-relaxed mb-8 font-serif">
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-gold font-serif italic text-lg">{review.name}</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/30">{review.location}</span>
                </div>
                {/* Subtle hover effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Payment Section */}
      <section id="contact" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif italic mb-12">Prendre Rendez-vous</h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <a 
              href="tel:+33622410120" 
              className="text-3xl md:text-5xl font-serif text-gold hover:text-white transition-colors duration-500 block mb-4"
            >
              +33 6 22 41 01 20
            </a>
            <p className="text-white/50 text-sm tracking-wide">
              Disponible pour des séances privées. Discrétion et professionnalisme garantis.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="flex flex-col items-center p-8 border border-white/5 rounded-2xl bg-white/[0.01]">
              <CreditCard className="text-gold w-8 h-8 mb-4" />
              <span className="text-xs uppercase tracking-widest">Carte Bancaire</span>
            </div>
            <div className="flex flex-col items-center p-8 border border-white/5 rounded-2xl bg-white/[0.01]">
              <Banknote className="text-gold w-8 h-8 mb-4" />
              <span className="text-xs uppercase tracking-widest">Espèces</span>
            </div>
          </div>

          <motion.a 
            href="https://wa.me/33622410120?text=Bonjour%20Juan,%20je%20souhaite%20réserver%20une%20séance%20de%20massage."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gold text-black px-12 py-5 rounded-full text-xs uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors duration-500"
          >
            Réserver ma séance
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.5em]">
          © 2026 Juan Luxe Massage • Site de Prestige
        </p>
      </footer>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-panel py-3' : 'py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a
            href="#hero"
            onClick={() => scrollToSection('#hero')}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <Code2 className="w-8 h-8 text-primary" />
            <span className="font-mono font-semibold text-lg">AR</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-muted-foreground hover:text-primary transition-colors font-medium relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <Button
              variant="outline"
              onClick={() => window.open('/resume/arushi-rathore-resume.pdf', '_blank')}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass-panel md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </button>
            ))}
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                window.open('/resume/arushi-rathore-resume.pdf', '_blank');
                setIsMobileMenuOpen(false);
              }}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Resume
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

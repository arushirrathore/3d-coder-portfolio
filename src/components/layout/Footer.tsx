import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Code2 } from 'lucide-react';

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/arushi-rathore',
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/arushirrathore',
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:arushi.rrathore@gmail.com',
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-primary" />
              <span className="font-mono font-semibold">AR</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <p className="text-muted-foreground text-sm">
              © {currentYear} Arushi Rathore
            </p>
          </motion.div>

          {/* Built with love */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 text-muted-foreground text-sm"
          >
            Designed & Developed with
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            by Arushi Rathore
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

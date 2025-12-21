import { motion } from 'framer-motion';
import { ArrowDown, FileDown, Folder, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TypeWriter } from '@/components/ui/TypeWriter';
import { HeroScene } from '@/components/3d/HeroScene';

const skills = [
  'Java Developer',
  'Spring Boot Expert',
  'React.js Developer',
  'Full Stack Engineer',
  'Microservices Architect',
];

export const Hero = () => {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      
      <div className="container mx-auto px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-primary mb-4 text-sm md:text-base tracking-wider"
          >
            {'<Hello World />'}
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            I'm{' '}
            <span className="gradient-text glow-text">Arushi Rathore</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl lg:text-3xl font-medium mb-8 h-12"
          >
            <TypeWriter words={skills} speed={80} deleteSpeed={40} delay={2500} />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10"
          >
            Building scalable, performant applications with Java, Spring Boot, React, and modern web technologies.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 group"
            >
              <Folder className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              View Projects
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('/resume/arushi-rathore-resume.pdf', '_blank')}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group"
            >
              <FileDown className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              Download Resume
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <a
              href="https://in.linkedin.com/in/arushi-rathore-312a1b374"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-panel-hover rounded-full text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/arushirrathore"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-panel-hover rounded-full text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-muted-foreground"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

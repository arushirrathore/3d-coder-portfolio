import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'E-Commerce Web Application',
    role: 'Java Developer',
    period: 'January 2025 – March 2025',
    description:
      'Developed a microservices-based e-commerce platform with JWT authentication, Role-Based Access Control, and Spring Data JPA backend. Achieved 20% performance improvement through database optimization and Redis caching implementation.',
    tech: ['Java', 'Spring Boot', 'Spring Security', 'React.js', 'Redux', 'MySQL', 'Redis', 'JWT'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    github: 'https://github.com/arushirrathore/ecom1',
    live: '#',
    featured: true,
  },
  {
    title: 'Portfolio Website',
    role: 'Frontend Developer',
    period: 'October 2024 – November 2024',
    description:
      'Built a responsive React.js portfolio website with GitHub API integration for dynamic project fetching and continuous deployment pipeline using GitHub Pages.',
    tech: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'GitHub API', 'GitHub Pages'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    github: 'https://github.com/arushirrathore/portfolio',
    live: '#',
    featured: true,
  },
  {
    title: 'DSA Visualizer',
    role: 'Software Developer',
    period: 'August 2024 – September 2024',
    description:
      'Created an interactive sorting algorithm visualization tool using HTML5 Canvas API with Big O complexity analysis, helping developers understand algorithm performance visually.',
    tech: ['JavaScript', 'React.js', 'HTML5 Canvas', 'CSS3', 'Algorithms'],
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop',
    github: 'https://github.com/arushirrathore/dsa-visualizer',
    live: '#',
    featured: true,
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  isInView: boolean;
}

const ProjectCard = ({ project, index, isInView }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer"
    >
      <div 
        className="glass-panel rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          transform: 'translateZ(50px)',
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(0, 229, 255, 0.25), 0 0 40px rgba(0, 229, 255, 0.1)' 
            : '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
            animate={{ translateX: isHovered ? '200%' : '-100%' }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Overlay buttons */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-4 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Button
                size="sm"
                onClick={() => window.open(project.github, '_blank')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Github className="mr-2 h-4 w-4" />
                Code
              </Button>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(project.live, '_blank')}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6" style={{ transform: 'translateZ(30px)' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary font-mono text-xs">{project.role}</span>
            <span className="text-muted-foreground text-xs">• {project.period}</span>
          </div>
          
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 5).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 text-xs"
              >
                {tech}
              </Badge>
            ))}
            {project.tech.length > 5 && (
              <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">
                +{project.tech.length - 5}
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl -z-10"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-24 relative overflow-hidden" style={{ perspective: '1000px' }}>
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm">{'<Projects />'}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A selection of projects showcasing my expertise in full-stack development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            variant="ghost"
            onClick={() => window.open('https://github.com/arushirrathore', '_blank')}
            className="text-muted-foreground hover:text-primary group"
          >
            View All Projects on GitHub
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

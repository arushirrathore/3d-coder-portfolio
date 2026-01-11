import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'Exam Seating Arrangement System',
    role: 'Full Stack Developer',
    period: 'Java Servlets & JSP',
    description:
      'Built web-based exam seating management system using Java Servlets and JSP framework. Designed MySQL database schema for student data and automated seat allocation logic. Implemented admin panel for managing exam schedules and generating seating reports.',
    tech: ['Java', 'Servlets', 'JSP', 'MySQL', 'HTML', 'CSS'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
    github: 'https://github.com/arushirrathore/Exam-Seating-Arrangement-System',
    live: 'https://examseatingar.lovable.app',
    featured: true,
  },
  {
    title: 'Password Generator Application',
    role: 'Java Developer',
    period: 'Security Tool',
    description:
      'Developed secure password generation tool with customizable parameters and strength validation. Implemented user-friendly interface for creating strong, random passwords for enhanced security. Applied core Java programming concepts to generate cryptographically secure passwords.',
    tech: ['Java', 'JavaScript', 'React', 'Security', 'Cryptography'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
    github: 'https://github.com/arushirrathore/password-genrator1',
    live: 'https://passwordgenra.lovable.app',
    featured: true,
  },
  {
    title: 'Word Count Tool',
    role: 'Java Developer',
    period: 'Text Analysis',
    description:
      'Built text analysis application to count words, characters, and lines in user-provided text. Designed intuitive interface for real-time text statistics and analysis. Utilized Java programming fundamentals for efficient string processing and data manipulation.',
    tech: ['Java', 'String Processing', 'Data Manipulation', 'UI Design'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    github: 'https://github.com/arushirrathore/word_count_tool_ar',
    live: '',
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass-panel rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_hsl(186_100%_50%/0.2)]">
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
          
          {/* Overlay buttons */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-4 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              size="sm"
              onClick={() => window.open(project.github, '_blank')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </Button>
            {project.live && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(project.live, '_blank')}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
              </Button>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
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
    </motion.div>
  );
};

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
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

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Skills3D } from '@/components/3d/Skills3D';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'SQL', level: 85 },
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
    ],
  },
  {
    title: 'Frameworks',
    skills: [
      { name: 'Spring Boot', level: 88 },
      { name: 'Spring Security', level: 82 },
      { name: 'React.js', level: 85 },
      { name: 'Redux', level: 80 },
      { name: 'Hibernate', level: 82 },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MySQL', level: 88 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'JDBC', level: 80 },
      { name: 'Redis', level: 75 },
    ],
  },
  {
    title: 'Tools & Concepts',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'REST APIs', level: 88 },
      { name: 'Microservices', level: 82 },
      { name: 'Maven', level: 85 },
      { name: 'Postman', level: 88 },
    ],
  },
];

interface SkillBarProps {
  name: string;
  level: number;
  delay: number;
  isInView: boolean;
}

const SkillBar = ({ name, level, delay, isInView }: SkillBarProps) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="font-medium text-foreground">{name}</span>
      <span className="text-primary font-mono text-sm">{level}%</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: 'easeOut' }}
        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      </motion.div>
    </div>
  </div>
);

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-card/30">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-primary text-sm">{'<Skills />'}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Proficient in building scalable applications with modern technologies and best practices.
          </p>
        </motion.div>

        {/* 3D Skills Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Skills3D />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 + 0.3 }}
              className="glass-panel rounded-2xl p-6 hover:shadow-[0_0_30px_hsl(186_100%_50%/0.15)] transition-shadow duration-500"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.5 + categoryIndex * 0.1 + skillIndex * 0.05}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

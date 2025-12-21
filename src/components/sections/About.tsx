import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Cpu, Database, Rocket } from 'lucide-react';
import { About3D } from '@/components/3d/About3D';

const highlights = [
  {
    icon: Code2,
    title: '3+ Projects',
    description: 'Full-stack applications built',
  },
  {
    icon: Cpu,
    title: '150+ Problems',
    description: 'DSA problems solved',
  },
  {
    icon: Database,
    title: '20% Optimization',
    description: 'Performance improvements achieved',
  },
  {
    icon: Rocket,
    title: 'Production Ready',
    description: 'Scalable & maintainable code',
  },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm">{'<About />'}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Get to Know <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <About3D />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <div className="glass-panel rounded-2xl p-8 hover:shadow-[0_0_40px_hsl(186_100%_50%/0.15)] transition-shadow duration-500">
              <h3 className="text-2xl font-semibold mb-4">
                Java Full Stack Developer
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a <span className="text-primary font-medium">final-year BCA student</span> specializing 
                  in Java Full Stack Development. My expertise spans across modern web technologies including 
                  <span className="text-foreground"> Java, Spring Boot, Spring Security, React.js, Redux, 
                  MySQL, PostgreSQL, RESTful APIs, and Microservices architecture</span>.
                </p>
                <p>
                  I've developed <span className="text-primary font-medium">3+ full-stack applications</span> with 
                  a focus on performance optimization, achieving <span className="text-primary font-medium">20% 
                  improvement</span> through database indexing, query optimization, and Redis caching implementation.
                </p>
                <p>
                  With <span className="text-primary font-medium">150+ DSA problems</span> solved on LeetCode and 
                  GeeksforGeeks, I bring strong problem-solving skills to every project. I'm passionate about 
                  writing clean, maintainable code following best practices and design patterns.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-panel-hover rounded-xl p-6 text-center cursor-pointer"
            >
              <motion.div 
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <item.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h4 className="text-xl font-bold gradient-text">{item.title}</h4>
              <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

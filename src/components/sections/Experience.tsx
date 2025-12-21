import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Award, Trophy, Users } from 'lucide-react';

const timelineData = [
  {
    type: 'education',
    icon: GraduationCap,
    title: 'Bachelor of Computer Applications (BCA)',
    organization: "J.D. Women's College, Delhi, India",
    period: 'Aug 2023 – Jun 2026 (Expected)',
    description: 'CGPA: 3.5/4.0 — Coursework: Data Structures, Algorithms, DBMS, OOP, Web Technologies, Software Engineering',
  },
  {
    type: 'certification',
    icon: Award,
    title: 'Java Programming Certification',
    organization: 'CodSoft',
    period: 'September 2025',
    description: 'Comprehensive certification covering core Java concepts, OOP principles, and best practices.',
  },
  {
    type: 'certification',
    icon: Award,
    title: 'GenAI Powered Data Analytics Job Simulation',
    organization: 'Tata Consultancy Services',
    period: 'August 2025',
    description: 'Hands-on experience with AI-powered data analytics tools and methodologies.',
  },
  {
    type: 'certification',
    icon: Award,
    title: 'Innovating with Google Cloud AI',
    organization: 'Google Cloud',
    period: 'August 2025',
    description: 'Training on leveraging Google Cloud AI services for innovative solutions.',
  },
  {
    type: 'achievement',
    icon: Trophy,
    title: 'Event Coordinator – TechFest 2024',
    organization: 'College Tech Event',
    period: '2024',
    description: 'Led 8-member team organizing coding competitions, hackathons, and workshops for 200+ attendees.',
  },
  {
    type: 'education',
    icon: GraduationCap,
    title: 'Senior Secondary (12th)',
    organization: 'Bihar School Examination Board',
    period: '2021 – 2023',
    description: 'Science with Mathematics — 68.2%',
  },
];

interface TimelineItemProps {
  item: typeof timelineData[0];
  index: number;
  isInView: boolean;
}

const TimelineItem = ({ item, index, isInView }: TimelineItemProps) => {
  const isLeft = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
        <div className={`glass-panel-hover rounded-xl p-6 inline-block w-full md:max-w-md ${isLeft ? 'md:ml-auto' : 'md:mr-auto'}`}>
          <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
            <span className="text-primary font-mono text-xs uppercase tracking-wider">
              {item.type}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
          <p className="text-primary text-sm mb-1">{item.organization}</p>
          <p className="text-muted-foreground text-xs mb-3">{item.period}</p>
          <p className="text-muted-foreground text-sm">{item.description}</p>
        </div>
      </div>

      {/* Icon */}
      <div className="relative z-10 flex-shrink-0 hidden md:block">
        <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center animate-glow-pulse">
          <item.icon className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Empty space for alignment */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-card/30">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm">{'<Experience />'}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Education & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            My academic journey and professional certifications.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/20 hidden md:block" />
          
          <div className="space-y-8 md:space-y-12">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={`${item.title}-${index}`}
                item={item}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

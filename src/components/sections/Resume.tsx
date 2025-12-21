import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FileText, Download, ExternalLink, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Resume = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isExpanded, setIsExpanded] = useState(false);

  const resumeUrl = 'https://drive.google.com/file/d/1cXcEeU_J-82dq1oNon6i0_weOj7t7SFE/view?usp=sharing';
  const googleDriveUrl = 'https://drive.google.com/file/d/1cXcEeU_J-82dq1oNon6i0_weOj7t7SFE/preview';

  return (
    <section id="resume" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-primary text-sm">{'<Resume />'}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            View My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Download or view my complete resume with all professional details.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Button
              size="lg"
              onClick={() => window.open(resumeUrl, '_blank')}
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 group"
            >
              <ExternalLink className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              View Resume
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const link = document.createElement('a');
                link.href = resumeUrl;
                link.download = 'Arushi-Rathore-Resume.pdf';
                link.click();
              }}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group"
            >
              <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              Download PDF
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground hover:text-primary"
            >
              <Maximize2 className="mr-2 h-5 w-5" />
              {isExpanded ? 'Collapse' : 'Expand Preview'}
            </Button>
          </div>

          {/* PDF Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`glass-panel rounded-2xl overflow-hidden transition-all duration-500 ${
              isExpanded ? 'h-[900px]' : 'h-[500px]'
            }`}
          >
            <div className="p-4 border-b border-border flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-medium">Arushi-Rathore-Resume.pdf</span>
            </div>
            <iframe
              src={googleDriveUrl}
              title="Resume Preview"
              className="w-full h-full border-0"
              allow="autoplay"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

import { useState, useEffect } from 'react';

interface TypeWriterProps {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
}

export const TypeWriter = ({ 
  words, 
  speed = 100, 
  deleteSpeed = 50, 
  delay = 2000 
}: TypeWriterProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(word.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, speed, deleteSpeed, delay]);

  return (
    <span className="inline-flex items-center">
      <span className="gradient-text">{currentText}</span>
      <span className="w-0.5 h-8 bg-primary animate-pulse ml-1" />
    </span>
  );
};

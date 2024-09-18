import { cn } from '@/lib/utils';
import Header from '@/models/Header';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface TOCProps {
  headers?: Header[];
}

const TOC: React.FC<TOCProps> = ({ headers }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    const headerOffset = 80;
    const elementPosition = element?.getBoundingClientRect().top || 0;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth' // Smooth scroll effect
    });
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.8 } // Adjust this threshold as needed
    );

    headers?.forEach(header => {
      const element = document.getElementById(header.id);
      if (element) {
        observer.observe(element);
      }
    });


    return () => {
      headers?.forEach(header => {
        const element = document.getElementById(header.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headers]);

  return (
    <ul className="list-none">
      {
        headers?.map(header => (
          <li
            className={cn("hover:text-blue-600 py-[5px]", activeId === header.id ? 'text-blue-600 font-bold' : 'text-gray-800')}
            key={header.id}
            style={{ paddingLeft: `${(header.level - 1) * 10}px` }}
          >
            <Link
              to={`#${header.id}`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                handleClick(header.id);
              }}
            >{header.text}</Link>
          </li>
        ))
      }
    </ul>
  );
};

export default TOC;

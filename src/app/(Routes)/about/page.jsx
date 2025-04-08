'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const aboutData = {
  founder: {
    name: 'Jahanzaib Naiyyer',
    description:
      'A visionary in media production, Jahanzaib Naiyyer has carved a unique path over the past decade—transforming a passion for storytelling into a thriving media empire. From founding Naiyyer Media to collaborating with top-tier brands, the journey reflects a deep commitment to quality content, strategic thinking, and authentic brand narratives. With every frame and campaign, the focus remains on delivering experiences that resonate and results that matter.',
    image: '/profile picture.png',
  },
  company: {
    description:
      'Founded by Jahanzaib Naiyyer, Naiyyer Media has grown into a premium content production and creative agency that partners with leading organizations to shape impactful stories. With a track record of producing high-conversion videos, performance-driven campaigns, and viral social content, the agency serves industries ranging from tech and fashion to education and lifestyle. Brands trust Naiyyer Media for its bold creativity, strategic insight, and ability to connect with audiences at scale.',
    image: '/image.png',
  },
  divisions: [
    {
      title: 'Naiyyer Studios',
      description:
        'A creative content powerhouse delivering everything from brand films to animation and commercial productions. Built for speed, scale, and story-first execution.',
    },
    {
      title: 'Naiyyer Digital',
      description:
        'A performance-led digital marketing arm driving visibility, engagement, and revenue through SEO, paid media, and influencer activations.',
    },
    {
      title: 'Creative Partnerships',
      description:
        'Consulting and collaboration services tailored for founders, startups, and enterprises aiming to level up their content game and brand strategy.',
    },
  ],
  stats: {
    employees: 30,
    clients: 100,
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

// Animated Number Component
const AnimatedNumbers = ({ target }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Effect to trigger animation when section becomes visible
  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('stats');
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // Check immediately on mount

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let current = 0;
      const interval = setInterval(() => {
        if (current < target) {
          current += Math.ceil(target / 100); // Increment value based on target
          setCount(current);
        } else {
          clearInterval(interval); // Stop when the target is reached
        }
      }, 30); // Adjust interval for smoother animation
    }
  }, [isVisible, target]);

  return <h4 className="text-4xl font-bold">{count}+</h4>;
};

export default function AboutPage() {
  return (
    <div className={`bg-gray-950 text-white min-h-screen py-24 px-6 font-outfit`}>
      {/* Founder Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <Image
          src={aboutData.founder.image}
          alt={aboutData.founder.name}
          width={200}
          height={200}
          className="rounded-full mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold mb-4">{aboutData.founder.name}</h1>
        <p className="text-gray-400">{aboutData.founder.description}</p>
      </motion.div>

      {/* Company Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 mb-20"
      >
        <div className="md:w-1/2">
          <Image
            src={aboutData.company.image}
            alt="Company"
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-cover w-full"
          />
        </div>
        <div className="md:w-1/2">
          <p className="text-gray-400">{aboutData.company.description}</p>
        </div>
      </motion.div>

      {/* Divisions Section */}
      <div className="max-w-6xl mx-auto mb-20">
        {aboutData.divisions.map((division, idx) => (
          <motion.div
            key={division.title}
            custom={idx + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="mb-12"
          >
            <h3 className="text-3xl font-semibold mb-4">{division.title}</h3>
            <p className="text-gray-400">{division.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        id="stats"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="flex justify-around">
          <div>
            <AnimatedNumbers target={aboutData.stats.employees} />
            <p className="text-gray-400">Employees</p>
          </div>
          <div>
            <AnimatedNumbers target={aboutData.stats.clients} />
            <p className="text-gray-400">Clients</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

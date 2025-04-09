'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const services = [
  {
    title: 'Video Production',
    description:
      'High-quality video production including concept development, filming, editing, and post-production for all platforms.',
    points: [
      'TV & Digital Commercials',
      'Animations - 2D & 3D Content',
      'Post-Production Services',
      'Scripting & Direction',
    ],
    image: '/production.png',
  },
  {
    title: 'Design & Branding',
    description:
      'Elevate your brand identity through strategic design, logos, motion graphics, and brand guidelines.',
    points: [
      'Logo & Visual Identity',
      'Brand Guidelines',
      'Motion Design',
      'Packaging Design',
    ],
    image: '/marketing.png',
  },
  {
    title: 'Marketing & Campaigns',
    description:
      'Full-stack marketing support from campaign ideation and influencer outreach to performance marketing.',
    points: [
      'Social Media Strategy',
      'Influencer Marketing',
      'Paid Media Campaigns',
      'Performance Reporting',
    ],
    image: '/placeholder 2.png',
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

export default function ServicesPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-20 px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our Services
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We bring your brand's vision to life through content, design, and marketing, helping you scale faster and smarter.
        </p>
      </motion.div>

      <div className="space-y-24 max-w-6xl mx-auto">
        {services.map((service, idx) => (
          <motion.div
            key={service.title}
            custom={idx + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              idx % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="md:w-1/2">
              <Image
                src={service.image}
                alt={service.title}
                width={600}
                height={400}
                className="rounded-xl shadow-lg object-cover w-full"
                decoding="async"
            loading="lazy"
            data-nimg="1"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-3xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <button className="mt-6 inline-block bg-red-600 hover:bg-red-500 transition px-6 py-2 rounded-full text-white font-medium">
                View Work
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

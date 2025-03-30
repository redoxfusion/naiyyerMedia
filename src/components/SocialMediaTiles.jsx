import { motion } from "framer-motion";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

const SocialMediaTiles = () => {
  // Animation variants for the tiles
  const tileVariants = {
    initial: {
      scale: 1,
      y: 0,
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  // Social media data
  const socialLinks = [
    {
      icon: <Twitter size={24} />,
      name: "Twitter",
      url: "https://twitter.com",
      color: "#1DA1F2",
    },
    {
      icon: <Facebook size={24} />,
      name: "Facebook",
      url: "https://facebook.com",
      color: "#4267B2",
    },
    {
      icon: <Instagram size={24} />,
      name: "Instagram",
      url: "https://instagram.com",
      color: "#E1306C",
    },
    {
      icon: <Linkedin size={24} />,
      name: "LinkedIn",
      url: "https://linkedin.com",
      color: "#0077B5",
    },
  ];

  return (
    <div className="social-tiles-container" style={{
      display: "flex",
      gap: "20px",
      padding: "20px",
      justifyContent: "center",
      flexWrap: "wrap"
    }}>
      {socialLinks.map((social) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={tileVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          style={{
            width: "120px",
            height: "120px",
            background: "white",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            color: social.color,
          }}
        >
          {social.icon}
          <span style={{
            marginTop: "10px",
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            fontWeight: "500",
          }}>
            {social.name}
          </span>
        </motion.a>
      ))}
    </div>
  );
};

export default SocialMediaTiles;
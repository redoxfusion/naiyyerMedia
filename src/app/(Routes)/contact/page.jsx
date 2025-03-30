import React from "react";
import { Outfit } from "next/font/google"; 

// ✅ Import & Initialize the Outfit Font (Outside Component)
const outfit = Outfit({
  weight: ["400", "600"], // You can add more weights if needed
  subsets: ["latin"], 
  display: "swap",
});

export default function Contact() {  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* ✅ Apply Outfit Font */}
      <h1 className={`text-3xl font-bold text-center mt-20 ${outfit.className}`}>
        Contact Us
      </h1>
      <p className={`text-center mt-5 ${outfit.className}`}>
        We value your feedback and inquiries. Please fill out the form below to
        get in touch with us. Whether you have questions about our services, want
        to collaborate, or simply want to say hello, we are here to listen.
      </p>

      {/* Google Form */}
      <iframe
        className="w-full h-screen mt-10 items-center"
        src="https://docs.google.com/forms/d/e/1FAIpQLSfze28o72THvotxPWc_Wqkb6J98VtprsiI9f7Xh6WhmLhQIpA/viewform?embedded=true"
        width="640"
        height="959"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        Loading…
      </iframe>
    </div>
  );
}

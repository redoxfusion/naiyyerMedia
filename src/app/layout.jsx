import "./globals.css";
import NevBar from "@/components/NevBar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body>
       <NevBar />
        {children}
       <Footer />
        <SpeedInsights/>
      </body>
    </html>
  );
}

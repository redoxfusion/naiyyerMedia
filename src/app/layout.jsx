import "./globals.css";
import NevBar from "@/components/NevBar";
import Footer from "@/components/Footer";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       <NevBar />
        {children}
       <Footer />
      </body>
    </html>
  );
}

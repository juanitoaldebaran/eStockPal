import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['400', '600', '700'], 
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={montserrat.className}
      >
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

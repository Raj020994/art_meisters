import "./globals.css";
import { Navbar } from "@/components/Navbar";
import localFont from "next/font/local";

export const metadata = {
  title: "Art Meisters | Art Society",
  description:
    "Where creativity meets expression. A community of passionate artists inspiring creativity and celebrating art in all its forms.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      >
    
      <body className="min-h-full flex flex-col font-sans selection:bg-accent ">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

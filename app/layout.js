import { Toaster } from "sonner";
import "./globals.css";
export const metadata = {
  title: "Art Meisters | Art Society",
  description:
    "Where creativity meets expression. A community of passionate artists inspiring creativity and celebrating art in all its forms.",
};
export default function RootLayout({ children }) {
  return (
    <html
    className="dark"
      lang="en"

      data-scroll-behavior="smooth"
      >
      <body className="min-h-full bg-black flex flex-col font-sans selection:bg-accent ">
          <Toaster richColors/>
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}

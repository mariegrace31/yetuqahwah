import { Raleway, Montserrat } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

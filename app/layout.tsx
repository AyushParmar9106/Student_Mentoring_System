import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Updated imports to use your specific components
import { ThemeProvider } from "./Components/ThemeProvider";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Mentoring System",
  description: "Academic guidance and progress tracking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased d-flex flex-column min-vh-100`}
      >
        {/* ThemeProvider must use attribute="data-bs-theme" 
            to allow Bootstrap 5.3+ to switch colors automatically 
        */}
        <ThemeProvider
          attribute="data-bs-theme"
          defaultTheme="light"
          enableSystem
        >
          {/* Use the dedicated Header component which contains your ThemeToggle */}
          <Header />

          {/* bg-body-tertiary will automatically turn dark 
              when the ThemeProvider changes data-bs-theme to "dark" 
          */}
          <main className="flex-grow-1 bg-body-tertiary">{children}</main>

          {/* Use the dedicated Footer component */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

// pages/_app.js or pages/_app.tsx

"use client";
import { ThemeProvider } from "next-themes"; // Import ThemeProvider from next-themes
import '../styles/globals.css'; // Import your global styles

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark"> {/* Set defaultTheme to "dark" */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
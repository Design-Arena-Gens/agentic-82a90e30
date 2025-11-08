import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Zero Lag MACD Enhanced',
  description: 'Interactive Zero Lag MACD Enhanced indicator',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <h1>Zero Lag MACD Enhanced</h1>
          {children}
          <footer>Built for Vercel deployment</footer>
        </div>
      </body>
    </html>
  );
}

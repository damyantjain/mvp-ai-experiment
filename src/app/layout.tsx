// src/app/layout.tsx
import './globals.css';
import Header from '@/components/Header';
import AuthSync from '@/components/AuthSync';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthSync />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}

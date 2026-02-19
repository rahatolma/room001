import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: "Room001 - Favori İçerik Üreticilerinden Alışveriş",
  description: "Room001 ile favori influencer'larınızın ve içerik üreticilerinizin önerdiği ürünleri keşfedin ve satın alın.",
};

import { DM_Sans, Inter, Playfair_Display, Space_Grotesk } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${dmSans.variable} ${inter.variable} ${playfair.variable} ${space.variable} ${dmSans.className}`}>
        <AuthProvider>
          <DataProvider>
            <ThemeProvider>
              <Header />
              <main style={{ minHeight: 'calc(100vh - 300px)' }}>
                {children}
              </main>
              <Footer />
            </ThemeProvider>
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

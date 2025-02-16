import type { Metadata } from 'next';

import './globals.css';
import { Footer, Nav } from '@/widgets/menu/ui';

export const metadata: Metadata = {
  title: '스프, 대학생 프로젝트 함께해요!',
  description: '',
  icons: '/favicon/favicon.ico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}

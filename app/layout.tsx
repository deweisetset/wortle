import type { Metadata } from 'next';
import '@/styles/wortle.css';

export const metadata: Metadata = {
  title: 'WORTLE - German Word Game',
  description: 'Tebak kata bahasa Jerman dengan AI dan leaderboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

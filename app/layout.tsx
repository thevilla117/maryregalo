import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant' 
});

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['200', '300', '400'],
  variable: '--font-montserrat' 
});

export const metadata: Metadata = {
  title: 'Para ti, Mary 💛',
  description: 'Hay recuerdos que merecen quedarse para siempre...',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${montserrat.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}

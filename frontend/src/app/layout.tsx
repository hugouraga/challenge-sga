import { Metadata } from 'next';
import ClientLayout from './client-layout';
import { Html } from 'next/document';

export const metadata: Metadata = {
  title: 'Sga - Frontend',
  description: 'Next',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="pt-br">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
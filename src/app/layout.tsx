import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akış | İş akışı otomasyonu",
  description:
    "Küçük ve orta ölçekli işletmeler için tekrar eden işleri azaltan, mevcut araçları birbirine bağlayan iş akışı otomasyonu.",
  applicationName: "Akış",
  openGraph: {
    title: "Akış | İş akışı otomasyonu",
    description:
      "Tekrar eden işleri azaltın. Ekibinizin zamanı daha değerli işlere kalsın.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

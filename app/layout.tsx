import "./globals.css";

export const metadata = {
  title: "Manaq Silver",
  description: "Peruvian silver jewelry. Limited pieces. EU shipping from day one.",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}


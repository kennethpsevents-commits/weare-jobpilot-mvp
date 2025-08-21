import './styles/globals.css';

export const metadata = {
  title: 'JobPilot',
  description: 'Find jobs fast and easy',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SoundVault - Music Distribution',
  description: 'Independent record label distribution platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-dark-950 text-white">
        {children}
      </body>
    </html>
  )
}

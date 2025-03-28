import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tripod Todo List',
  description: 'A beautiful and interactive todo list with date organization',
  icons: {
    icon: [
      { url: '/Tripod-Todo/img/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/Tripod-Todo/img/favicon.png',
    apple: '/Tripod-Todo/img/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/Tripod-Todo/img/favicon.png" />
        <link rel="apple-touch-icon" href="/Tripod-Todo/img/favicon.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
} 
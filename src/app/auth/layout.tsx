import "../globals.css"

export const metadata = {
  title: 'Fund Raiser Authentication',
  description: 'Explore high-impact funding opportunities with measurable returns. Join a network of investors backing innovative, scalable projects across emerging markets.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[84svh] w-full h-full flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl md:text-5xl font-serif font-[600] text-foreground">404: Page Not Found</h1>
      <div className="flex flex-col gap-4 text-xl md:text-2xl">
        <Link
          href="/"
          className="text-primary hover:text-contrast-2 transition-colors underline"
        >
          Take me Home
        </Link>
        <Link
          href="/overview/urbit-explained"
          className="text-primary hover:text-contrast-2 transition-colors underline"
        >
          Explain urbit
        </Link>
      </div>
    </div>
  )
}
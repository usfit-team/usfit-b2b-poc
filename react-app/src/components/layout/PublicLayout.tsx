import { Outlet, Link } from 'react-router-dom'

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      {/* Branding header */}
      <header className="h-16 border-b border-gray-100 flex items-center px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8">
            <img
              src="/logo.png"
              alt="USFIT logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-semibold tracking-tight">
            <b className="text-gray-900 text-lg font-bold font-display">
              USFIT
            </b>
            <span className="text-usfit-gradient font-display">B2B</span>
          </span>
        </Link>
      </header>

      {/* Page content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

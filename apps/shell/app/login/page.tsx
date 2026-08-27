import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign in</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input className="mt-1 w-full border rounded p-2" placeholder="email@example.com" />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" className="mt-1 w-full border rounded p-2" />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign in</button>
          <Link href="/">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

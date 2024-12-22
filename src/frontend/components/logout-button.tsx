'use client'

export function LogoutButton() {
  const handleLogout = () => {
    // FUA to handle logout logic here
    console.log('Logging out...')
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
    >
      Log Out
    </button>
  )
}
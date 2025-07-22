// src/app/page.tsx atau src/app/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="p-6 text-white bg-slate-900 h-screen">
      <h1 className="text-xl font-bold">PRESSOC</h1>
      <p className="mt-4">Profile Account</p>

      <div className="mt-4 p-4 bg-slate-800 rounded">
        <div className="flex items-center gap-2">
          <span>👤</span>
          <span>{session?.user?.username}</span>
        </div>
      </div>

      <form action="/api/auth/signout?callbackUrl=/login" method="post" className="mt-4">
        <button type="submit" className="text-red-500">🚪 Log out</button>
      </form>

    </div>
  );
}

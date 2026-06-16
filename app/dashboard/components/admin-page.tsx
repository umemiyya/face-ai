// app/admin/users/page.tsx

import { UserButton } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { Users, UserCheck, Shield, UserPlus } from "lucide-react";
import Link from "next/link";

export default async function UsersPage() {
  const client = await clerkClient();

  const users = await client.users.getUserList({
    limit: 100,
  });

  const totalUsers = users.totalCount;

  const activeUsers = users.data.filter(
    (user) => user.lastSignInAt
  ).length;

  const admins = users.data.filter(
    (user) => user.publicMetadata?.role === "admin"
  ).length;

  const today = new Date();

  const newToday = users.data.filter((user) => {
    const created = new Date(user.createdAt);

    return (
      created.getDate() === today.getDate() &&
      created.getMonth() === today.getMonth() &&
      created.getFullYear() === today.getFullYear()
    );
  }).length;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
                  <div>
            <header className="flex items-center justify-between w-full h-16 gap-4">
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-medium text-[0.8125rem] rounded-full px-3 py-2 hover:bg-gray-100"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Home
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "size-8",
                    },
                  }}
                />
              </div>
            </header>
          </div>

        {/* HEADER */}
        <div className="rounded-md border border-slate-200 bg-slate-100/50 p-12">
          <div className="flex justify-center">
            <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
              User Management
            </div>
          </div>

          <h1 className="mt-8 text-center text-3xl font-bold tracking-tight text-slate-900">
            Daftar Pengguna
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-600">
            Kelola seluruh pengguna yang terdaftar pada aplikasi
            Deepfake Detection AI.
          </p>
        </div>

        {/* STATS */}
        <div className="grid gap-6 md:grid-cols-4">

          <div className="border bg-white p-6">
            <Users className="mb-4 h-8 w-8 text-blue-500" />

            <p className="text-sm text-slate-500">
              Total Users
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {totalUsers}
            </h3>
          </div>

          <div className="border bg-white p-6">
            <UserCheck className="mb-4 h-8 w-8 text-blue-500" />

            <p className="text-sm text-slate-500">
              Active Users
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {activeUsers}
            </h3>
          </div>

          <div className="border bg-white p-6">
            <Shield className="mb-4 h-8 w-8 text-blue-500" />

            <p className="text-sm text-slate-500">
              Admins
            </p>

            <h3 className="mt-2 text-3xl font-bold">
               1
            </h3>
          </div>

          <div className="border bg-white p-6">
            <UserPlus className="mb-4 h-8 w-8 text-blue-500" />

            <p className="text-sm text-slate-500">
              New Today
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {newToday}
            </h3>
          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-md border bg-white">

          <div className="border-b bg-slate-50 px-8 py-6">
            <h2 className="text-xl font-semibold">
              Semua Pengguna
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Menampilkan seluruh user yang terdaftar di Clerk.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">

              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-8 py-5 text-left text-sm font-semibold">
                    User
                  </th>

                  <th className="px-8 py-5 text-left text-sm font-semibold">
                    Email
                  </th>

                  <th className="px-8 py-5 text-left text-sm font-semibold">
                    Role
                  </th>

                  <th className="px-8 py-5 text-left text-sm font-semibold">
                    Bergabung
                  </th>

                  <th className="px-8 py-5 text-left text-sm font-semibold">
                    Login Terakhir
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.data.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b transition-colors hover:bg-slate-50"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">

                        <img
                          src={user.imageUrl}
                          alt={user.fullName ?? "User"}
                          className="h-12 w-12 rounded-full border object-cover"
                        />

                        <div>
                          <p className="font-medium text-slate-900">
                            {user.fullName || "No Name"}
                          </p>

                          <p className="text-sm text-slate-500">
                            {user.username || user.id}
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-8 py-5 text-slate-700">
                      {user.primaryEmailAddress?.emailAddress}
                    </td>

                    <td className="px-8 py-5">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
                        {String(
                          user.publicMetadata?.role ?? "user"
                        )}
                      </span>
                    </td>

                    <td className="px-8 py-5 text-slate-700">
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString("id-ID")}
                    </td>

                    <td className="px-8 py-5 text-slate-700">
                      {user.lastSignInAt
                        ? new Date(
                            user.lastSignInAt
                          ).toLocaleDateString("id-ID")
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
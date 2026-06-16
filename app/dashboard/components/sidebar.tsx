import Link from "next/link";
import { Database, Users } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-3xl font-bold">
          DeepDetect
        </h1>

        <p className="text-sm text-muted-foreground">
          Admin Dashboard
        </p>
      </div>

      <nav className="space-y-2 p-4">

        <Link
          href="/admin/users"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-100"
        >
          <Users className="h-5 w-5" />
          Users
        </Link>

        <Link
          href="/admin/dataset"
          className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-3"
        >
          <Database className="h-5 w-5" />
          Dataset
        </Link>

      </nav>
    </aside>
  );
}
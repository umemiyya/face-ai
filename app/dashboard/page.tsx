import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Footer } from "../_template/components/footer";
import Link from "next/link";
import { DetectCard } from "./components/detect-card";
import AdminPage from "./components/admin-page";

export default async function DashboardPage() {
  await auth.protect();

  const user = await currentUser();

  const email = user?.emailAddresses[0].emailAddress;

  if(email == "firanurul64@gmail.com") {
  // if(email == "nanashieth@gmail.com") {
    // Handle unauthorized access
    return <AdminPage />;
  }

  // Tekstur motif kawung tipis sebagai latar, senada dengan halaman SignIn & Admin
  const kawungPattern =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23C89B3C' stroke-width='1' opacity='0.35'%3E%3Cellipse cx='20' cy='20' rx='14' ry='9' transform='rotate(45 20 20)'/%3E%3Cellipse cx='60' cy='20' rx='14' ry='9' transform='rotate(-45 60 20)'/%3E%3Cellipse cx='20' cy='60' rx='14' ry='9' transform='rotate(-45 20 60)'/%3E%3Cellipse cx='60' cy='60' rx='14' ry='9' transform='rotate(45 60 60)'/%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/svg%3E";

  return (
    <>
      <main className="max-w-300 w-full mx-auto">
        <div
          className="grid gap-10 pb-10 bg-[#FBF4E8]"
          style={{
            backgroundImage: `url("${kawungPattern}")`,
            backgroundRepeat: "repeat",
          }}
        >
          <div>
            <header className="flex items-center justify-between w-full h-16 gap-4">
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-medium text-[0.8125rem] rounded-full px-3 py-2 text-[#7A2E2E] hover:bg-[#F3E7D3]"
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
                  Kembali ke Beranda
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
          <div className="flex flex-col">
            <DetectCard />
          </div>
        </div>
      </main>
      {/* <LearnMore cards={DASHBOARD_CARDS} /> */}
      <Footer />
    </>
  );
}
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Footer } from "../_template/components/footer";
import Link from "next/link";
import { DetectCard } from "./components/detect-card";
import UsersPage from "./components/admin-page";

export default async function DashboardPage() {
  await auth.protect();

  const user = await currentUser();

  const email = user?.emailAddresses[0].emailAddress;

  if(email == "firanurul64@gmail.com") {
    // Handle unauthorized access
    return <UsersPage />;
  }

  return (
    <>
      <main className="max-w-300 w-full mx-auto">
        <div className="grid gap-10 pb-10">
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

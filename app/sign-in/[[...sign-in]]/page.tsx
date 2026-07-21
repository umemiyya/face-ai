import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F3E7D3] px-4 py-16">
      {/* Motif batik kawung sebagai latar belakang halus */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="kawung"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <g fill="none" stroke="#6B3226" strokeWidth="1.5">
              <ellipse cx="15" cy="15" rx="12" ry="8" transform="rotate(45 15 15)" />
              <ellipse cx="45" cy="15" rx="12" ry="8" transform="rotate(-45 45 15)" />
              <ellipse cx="15" cy="45" rx="12" ry="8" transform="rotate(-45 15 45)" />
              <ellipse cx="45" cy="45" rx="12" ry="8" transform="rotate(45 45 45)" />
              <circle cx="30" cy="30" r="4" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kawung)" />
      </svg>

      {/* Garis prada (emas) di tepi atas & bawah sebagai jahitan tenun */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#C89B3C] via-[#E4C879] to-[#C89B3C]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#C89B3C] via-[#E4C879] to-[#C89B3C]" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center gap-1 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8A6A3B]">
            Selamat Datang
          </span>
          <h1 className="font-serif text-2xl text-[#3A2417]">
            Masuk ke Akun Anda
          </h1>
        </div>

        <SignIn
          appearance={{
            variables: {
              colorPrimary: "#7A2E2E", // soga / marun batik
              colorBackground: "#FBF4E8",
              colorForeground: "#2B211A",
              colorMutedForeground: "#6B5A47",
              colorInput: "#FFFDF9",
              colorInputForeground: "#2B211A",
              borderRadius: "0.5rem",
              fontFamily: "var(--font-body, ui-sans-serif)",
            },
            elements: {
              rootBox: "w-full max-w-md",
              card: [
                "shadow-xl border border-[#C89B3C]/40 bg-[#FBF4E8]",
                "relative before:absolute before:inset-2 before:rounded-md",
                "before:border before:border-[#C89B3C]/30 before:pointer-events-none",
              ].join(" "),
              headerTitle: "font-serif text-[#3A2417]",
              headerSubtitle: "text-[#6B5A47]",
              socialButtonsBlockButton:
                "border border-[#C89B3C]/50 hover:bg-[#F3E7D3] transition-colors",
              socialButtonsBlockButtonText: "text-[#3A2417] font-medium",
              dividerLine: "bg-[#C89B3C]/30",
              dividerText: "text-[#8A6A3B] text-xs uppercase tracking-wider",
              formFieldLabel: "text-[#3A2417] font-medium",
              formFieldInput:
                "border-[#C89B3C]/40 focus:border-[#7A2E2E] focus:ring-[#7A2E2E]/30",
              formButtonPrimary:
                "bg-[#7A2E2E] hover:bg-[#5F2323] text-[#F3E7D3] normal-case font-medium tracking-wide transition-colors",
              footerActionText: "text-[#6B5A47]",
              footerActionLink:
                "text-[#7A2E2E] hover:text-[#5F2323] font-semibold",
              identityPreviewText: "text-[#3A2417]",
              identityPreviewEditButtonIcon: "text-[#7A2E2E]",
              otpCodeFieldInput:
                "border-[#C89B3C]/40 focus:border-[#7A2E2E] text-[#3A2417]",
            },
          }}
        />

      </div>
    </div>
  );
}
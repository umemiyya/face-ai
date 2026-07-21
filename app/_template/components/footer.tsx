'use client'

import Link from 'next/link'

export function Footer() {
  const footerLinks = [
    {
      title: 'Produk',
      links: [
        {
          label: 'Deteksi Deepfake',
          href: '#fitur',
        },
        {
          label: 'Dashboard',
          href: '#',
        },
        {
          label: 'Dokumentasi',
          href: '#',
        },
      ],
    },
    {
      title: 'Perusahaan',
      links: [
        {
          label: 'Tentang Kami',
          href: '#',
        },
        {
          label: 'Blog',
          href: '#',
        },
        {
          label: 'Karir',
          href: '#',
        },
      ],
    },
    {
      title: 'Bantuan',
      links: [
        {
          label: 'Pusat Bantuan',
          href: '#',
        },
        {
          label: 'Kontak',
          href: '#',
        },
        {
          label: 'FAQ',
          href: '#',
        },
      ],
    },
    {
      title: 'Legal',
      links: [
        {
          label: 'Kebijakan Privasi',
          href: '#',
        },
        {
          label: 'Syarat & Ketentuan',
          href: '#',
        },
        {
          label: 'Keamanan',
          href: '#',
        },
      ],
    },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-[#C89B3C]/30 bg-[#F3E7D3]">
      {/* Garis prada emas di tepi atas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C89B3C] via-[#E4C879] to-[#C89B3C]" />

      {/* Motif batik kawung sebagai latar belakang halus */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="kawung-footer"
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
        <rect width="100%" height="100%" fill="url(#kawung-footer)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Tautan */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 font-serif text-base text-[#3A2417]">
                {group.title}
              </h4>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#6B5A47] transition-colors hover:text-[#7A2E2E]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bagian Bawah */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#C89B3C]/30 pt-8 md:flex-row">
          <p className="text-sm text-[#8A6A3B]">
            © 2026 DeepShield AI. Semua hak dilindungi.
          </p>

          <div className="flex items-center gap-6 text-sm text-[#8A6A3B]">
            <Link href="#" className="transition hover:text-[#7A2E2E]">
              Privasi
            </Link>

            <Link href="#" className="transition hover:text-[#7A2E2E]">
              Ketentuan
            </Link>

            <Link href="#" className="transition hover:text-[#7A2E2E]">
              Keamanan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
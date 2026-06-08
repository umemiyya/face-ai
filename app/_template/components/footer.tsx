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
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-slate-900 mb-4">
                {group.title}
              </h4>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-500 hover:text-blue-600 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 DeepShield AI. Semua hak dilindungi.
          </p>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link
              href="#"
              className="hover:text-blue-600 transition"
            >
              Privasi
            </Link>

            <Link
              href="#"
              className="hover:text-blue-600 transition"
            >
              Ketentuan
            </Link>

            <Link
              href="#"
              className="hover:text-blue-600 transition"
            >
              Keamanan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
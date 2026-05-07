import { Sparkles, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

const columns = [
  {
    title: 'Produto',
    links: [
      { label: 'Funcionalidades', href: '/experiences' },
      { label: 'Preços', href: '#' },
      { label: 'Demonstração', href: '/experiences' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contato', href: '#' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Central de Ajuda', href: '#' },
      { label: 'Guia de Uso', href: '#' },
      { label: 'Privacidade', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 ">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-neutral-950">
                ChoiceLog
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-600">
              More conscious consumer decisions, based on reflection and real data.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-neutral-950">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 transition-colors hover:text-neutral-950"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-6 sm:flex-row">
          <p className="text-sm text-neutral-500">
            © 2026 ChoiceLog. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/RachelS2"
              aria-label="GitHub"
              className="text-neutral-500 transition-colors hover:text-neutral-950"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/rachelbarinosilva/"
              aria-label="Linkedin"
              className="text-neutral-500 transition-colors hover:text-neutral-950"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
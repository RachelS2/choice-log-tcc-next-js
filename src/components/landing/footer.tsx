import { Sparkles, Github, Linkedin } from "lucide-react";
import Link from "next/link";

const columns = [
  {
    title: "Produto",
    links: [
      { label: "Funcionalidades", href: "/#funcionalidades" },
      { label: "Como funciona", href: "/#como-funciona" },
    ],
  },
  {
    title: "ChoiceLog",
    links: [{ label: "Sobre", href: "/about" }],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-offWhite">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex w-fit items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Sparkles className="size-4" />
              </span>

              <span className="text-lg font-semibold tracking-tight text-neutral-950">
                ChoiceLog
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600">
              Decisões de consumo mais conscientes, baseadas em reflexão e
              dados reais.
            </p>
          </div>

          {/* Links */}
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold text-neutral-950">
                {column.title}
              </h4>

              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
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

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-500">
            © 2026 ChoiceLog. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/RachelS2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Rachel Barino Silva"
              className="text-neutral-500 transition-colors hover:text-neutral-950"
            >
              <Github className="size-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/rachelbarinosilva/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Rachel Barino Silva"
              className="text-neutral-500 transition-colors hover:text-neutral-950"
            >
              <Linkedin className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
"use client";
import Link from "next/link";
import { useState } from "react";

const calculadoras = [
  { href: "/calculadoras/rescisao", label: "Rescisão" },
  { href: "/calculadoras/decimo-terceiro", label: "13º Salário" },
  { href: "/calculadoras/ferias", label: "Férias" },
  { href: "/calculadoras/hora-extra", label: "Hora Extra" },
  { href: "/calculadoras/fgts", label: "FGTS" },
  { href: "/calculadoras/aviso-previo", label: "Aviso Prévio" },
  { href: "/calculadoras/salario-liquido", label: "Salário Líquido" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-forest-900 text-cream sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
            <span className="text-forest-900 font-display font-bold text-sm">C</span>
          </div>
          <span className="font-display text-xl text-cream group-hover:text-lime-400 transition-colors">
            Calc<span className="text-lime-400">Trabalhista</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {calculadoras.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="text-xs font-body font-medium text-forest-300 hover:text-lime-400 px-3 py-1.5 rounded-lg hover:bg-forest-800 transition-all"
            >
              {c.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-cream p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-forest-800 border-t border-forest-700 px-4 py-3">
          <div className="grid grid-cols-2 gap-2">
            {calculadoras.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-body text-forest-300 hover:text-lime-400 py-2 px-3 rounded-lg hover:bg-forest-700 transition-all"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

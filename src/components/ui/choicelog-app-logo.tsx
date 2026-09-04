'use client';

import Link from 'next/link';
import { CheckSquare, ShoppingBag, ShoppingCart } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AppLogoProps {
  textColor?: string;
  href?: string; // se não houver href, logo não é clicável
}


export default function AppLogo({
  textColor = "text-gray-900",
  href,
}: AppLogoProps) {
  const isClickable = Boolean(href);

  const content = (
    <div
      className={`
        flex items-center gap-3
        ${
          isClickable
            ? "cursor-pointer hover:opacity-80 transition-opacity"
            : "cursor-default"
        }
      `}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shrink-0">
        <ShoppingBag className="h-4 w-4 text-white" />
      </div>

      <span
        className={`
          whitespace-nowrap
          text-3xl
          font-semibold
          font-serif
          ${textColor}
        `}
      >
        Choice Log
      </span>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

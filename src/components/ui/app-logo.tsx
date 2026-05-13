'use client';

import Link from 'next/link';
import { CheckSquare, ShoppingBag, ShoppingCart } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AppLogoProps {
  textColor?: string;
  href?: string; // se não houver href, logo não é clicável
}

export default function AppLogo({ textColor = "text-gray-900", href }: AppLogoProps) {
  const isClickable: boolean  = Boolean(href);

  const content = (
    <div
      className={`flex items-center gap-1 text-[2rem] ${
        isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-default'
      }`}
    >
      <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
        <ShoppingBag className="h-4 w-4 text-white"/>
      </div>
      <span className="font-semibold font-serif text-gray-900">Choice Log</span>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

'use client';

import Link from 'next/link';
import { CheckSquare, ShoppingBag, ShoppingCart } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AppLogoProps {
  textColor?: string;
  href?: string; // se não houver href, logo não é clicável
}

export default function AppLogo({ textColor = "text-darkBlue", href }: AppLogoProps) {
  const isClickable: boolean  = Boolean(href);

  const content = (
    <div
      className={`flex items-center gap-1 text-[2rem] ${
        isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-default'
      }`}
    >
      <CheckSquare className={cn("bg-beige w-10 h-7 ", textColor)} />
      <span className={cn("font-bold", textColor)}> 
        ChoiceLog
      </span>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

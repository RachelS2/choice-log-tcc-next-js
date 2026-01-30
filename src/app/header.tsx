'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import AppLogo from '@/app/ui/app-logo'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const linkClass : string=
    "flex items-center justify-center transition-colors hover:brightness-110 aria-disabled:cursor-not-allowed px-3 aria-disabled:opacity-50 rounded-full hover:bg-blue h-10";

  const hamburgerMenuClass: string = "flex items-center justify-center w-[130px] whitespace-nowrap px-2 transition-colors hover:brightness-110 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 md:w-[140px] rounded hover:bg-darkBlue h-10";

  return (

    <header className="fixed top-0 w-full h-[100px] flex items-center justify-between bg-darkBlue text-white border-b-2 border-white z-50">

      <div className="mx-5">
        <AppLogo textColor="text-white" href='/'/>
      </div>

      {/* Hamburguer button control, visible when the screen is minimized */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white m-5 cursor-pointer"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Desktop nav menu */}
      <nav className="hidden md:flex items-center justify-center gap-5 text-[1.2rem] mx-5">
        <Link href="/how-it-works" className={`${linkClass} whitespace-nowrap`}>How It Works</Link>
        <Link href="/resources" className={`${linkClass}`}>Resources</Link>
        <Link href="/about"  className={`${linkClass}`}>About</Link>
        <Link href="/login" className={`${linkClass}`}>Log In</Link>
        <Link href="/start-now" className={`${linkClass} whitespace-nowrap` }>Start Now</Link>
        {/* <Button className="w-[130px] md:w-[140px] bg-[var(--darkdarkBlue)] hover:bg-lightdarkBlue">Start Now</Button> */}
      </nav>

      {/* Menu mobile dropdown - Hamburguer */}
      {isOpen && (
        
        <nav className="absolute items-center justify-center top-[100px] w-full right-0 bg-accent flex flex-row items-center gap-2 py-4 px-4 text-lg md:hidden z-40">
          <Link href="/how-it-works" className={`${hamburgerMenuClass}`} onClick={() => setIsOpen(false)}>How It Works</Link>
          <Link href="/resources" className={`${hamburgerMenuClass}`}  onClick={() => setIsOpen(false)}>Resources</Link>
          <Link href="/about"  className={`${hamburgerMenuClass}`}  onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/login" className={`${hamburgerMenuClass}`} >Log In</Link>
          <Link href="/start-now"  className={`${hamburgerMenuClass}`} >Start Now</Link>
        </nav>
      )}
    </header>
  )
}

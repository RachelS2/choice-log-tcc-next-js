'use client'
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import  MainHeader from './main-header';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
export default function NotFound() {
  const router = useRouter();
  return (
    <main className="gap-2">
      <MainHeader />
      <FaceFrownIcon className="w-13 text-superDarkGray" />
      <h2 className="text-2xl font-semibold text-superDarkGray  ">404 Not Found</h2>
      <p className="text-xl text-superDarkGray">Could not find the requested page.</p>
      <Button
        onClick={() => router.back()}
        className="mt-4 rounded-md bg-darkBlue px-4 py-2 text-l text-white transition-colors hover:bg-blue"
      >
        Go Back
      </Button>
    </main>
  );
}
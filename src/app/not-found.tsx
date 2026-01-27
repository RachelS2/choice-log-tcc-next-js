import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
 
export default function NotFound() {
  return (
    <main className="gap-2">
      <FaceFrownIcon className="w-13 text-superDarkGray" />
      <h2 className="text-2xl font-semibold text-superDarkGray  ">404 Not Found</h2>
      <p className="text-xl text-superDarkGray">Could not find the requested page.</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-darkBlue px-4 py-2 text-l text-white transition-colors hover:bg-blue"
      >
        Go Back
      </Link>
    </main>
  );
}
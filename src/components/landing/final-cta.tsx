import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FinalCTASection() {
  return (
    <section className="px-4 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 0, transparent 40%)',
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Pronto(a) para comprar com mais consciência?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-xl text-blue-50 sm:text-2xl">
              Reflita sobre compras passadas e otimize as compras futuras.
            </p>
            <div className="mt-12">
              <Button
                asChild
                size="lg"
                className="bg-white text-lg text-blue-700 shadow-sm transition-all hover:bg-neutral-100 hover:shadow-md"
              >
                <Link href="/sign-up">
                  Cadastre-se gratuitamente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
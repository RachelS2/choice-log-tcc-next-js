import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function HeroDashboardSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: copy */}
          <div className="flex flex-col items-start">
            <Badge
              variant="outline"
              className="mb-6 rounded-full border-neutral-300 bg-white px-3 py-3 text-base font-medium text-neutral-700"
            >
              Consumerism reflection platform
            </Badge>

            <h1 className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent sm:text-5xl lg:text-6xl">
              Better shopping decisions start here.
            </h1>

            <p className="mt-6 max-w-xl text-xl leading-relaxed text-neutral-900">
              ChoiceLog helps you record, evaluate, and reflect on your shopping experiences — 
              transforming each purchase into a step toward more informed future decisions.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="bg-blue-600 text-white text-base hover:bg-blue-700 hover:text-white"
            >
                <Link href="/login">
                  Start Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-neutral-300 text-base bg-white text-neutral-950 hover:bg-neutral-100 hover:text-neutral-700 transition-colors">
                  <Link href="/experiences">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Right column: dashboard mockup */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-transparent blur-3xl"
            />
            <div className="relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl shadow-neutral-200/60">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                    LAST EXPERIENCE
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-neutral-950">
                    Fone Bluetooth Pro X
                  </h3>
                  <p className="text-sm text-neutral-500">SoundCo · R$ 499,90</p>
                </div>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-sm font-medium text-blue-700">
                  Excellent
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
                <Star
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                  style={{ clipPath: 'inset(0 50% 0 0)' }}
                />
                <span className="ml-2 text-sm font-medium text-neutral-700">
                  4,5 / 5
                </span>
              </div>

              {/* Mini chart */}
              <div className="mt-6 rounded-xl bg-neutral-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-s font-medium text-neutral-600">
                    Your consumption satisfaction over time 
                  </span>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex h-20 items-end gap-1.5">
                  {[35, 50, 42, 65, 58, 78, 72, 88, 82, 92, 85, 95].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-blue-500 to-blue-400"
                        style={{ height: `${h}%` }}
                      />
                    ),
                  )}
                </div>
              </div>

              {/* Small meta row */}
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg border border-neutral-200 p-2">
                  <p className="text-sm text-neutral-800">Registered Experiences</p>
                  <p className="text-xs font-semibold text-neutral-950">
                    248
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-200 p-2">
                  <p className="text-sm text-neutral-800">Average Satisfaction</p>
                  <p className="text-xs font-semibold text-neutral-950">
                    4,3
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-200 p-2">
                  <p className="text-sm text-neutral-800">Economy</p>
                  <p className="text-xs font-semibold text-blue-600">+18%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
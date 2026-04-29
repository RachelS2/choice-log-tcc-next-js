import { ShoppingBag, Star, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ShoppingBag,
    title: 'Register a Purchase',
    description:
      'Add the product, its brand, the price paid, and the context that led to the purchase decision.',
  },
  {
    number: '02',
    icon: Star,
    title: 'Evaluate Experience',
    description:
      "After use, rate it and record what worked—or didn't work—in practice.",
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Improve Future Decisions',
    description:
      'Analyze your history, find patterns, and make more informed purchasing decisions from now on.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="border-t border-neutral-200  py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent sm:text-4xl">
            How It Works          </h2>
          <p className="mt-4 text-xl text-neutral-900">
            Three simple steps to make you reflect about your last shop.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <div
              key={number}
              className="relative rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl font-semibold tracking-tight text-blue-600">
                  {number}
                </span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                  <Icon className="h-5 w-5 text-neutral-700" />
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-neutral-950">
                {title}
              </h3>
              <p className="mt-2 text-lg leading-relaxed text-neutral-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardCheck, Star, BarChart3 } from 'lucide-react';

const benefits = [
  {
    icon: ClipboardCheck,
    title: 'Record purchase decisions',
    description:
      'Keep a detailed record of each purchase — products, brands, prices, and the context of the decision for your future self.',
  },
  {
    icon: Star,
    title: 'Evaluate real experiences',
    description:
      'Assign ratings and write honest reflections about what you have consumed, based on the actual use of the product.',
  },
  {
    icon: BarChart3,
    title: 'Discover your consumption patterns',
    description:
      'Visualize trends, identify recurring decisions, and improve your consumption habits over time.',
  },
];

export default function BenefitsSection() {
  return (
    <section className="border-t border-neutral-200  py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent sm:text-4xl">
            Everything you need to make smarter shopping decisions
          </h2>
          <h3 className="mt-6 text-xl text-neutral-900">
            A platform designed for those seeking greater awareness and clarity in their daily consumption decisions.
          </h3>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="rounded-xl border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-950">
                  {title}
                </h3>
                <p className="mt-2 text-lg leading-relaxed text-neutral-600">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
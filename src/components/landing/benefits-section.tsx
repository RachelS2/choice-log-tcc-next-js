import { Card, CardContent } from '@/components/ui/card';
import { ClipboardCheck, Star, BarChart3 } from 'lucide-react';

const benefits = [
  {
    icon: ClipboardCheck,
    title: 'Registre decisões de compra',
    description:
      'Mantenha um histórico detalhado de cada aquisição — produtos, marcas, preços e contexto da decisão.',
  },
  {
    icon: Star,
    title: 'Avalie experiências reais',
    description:
      'Atribua notas e escreva reflexões honestas sobre o que você consumiu, com base no uso real do produto.',
  },
  {
    icon: BarChart3,
    title: 'Descubra padrões de consumo',
    description:
      'Visualize tendências, identifique decisões recorrentes e melhore sua forma de consumir ao longo do tempo.',
  },
];

export default function BenefitsSection() {
  return (
    <section className="border-t border-neutral-200  py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Tudo o que você precisa para consumir melhor
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Uma plataforma pensada para quem busca mais consciência e clareza
            nas decisões de consumo do dia a dia.
          </p>
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
                <h3 className="text-lg font-semibold text-neutral-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
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
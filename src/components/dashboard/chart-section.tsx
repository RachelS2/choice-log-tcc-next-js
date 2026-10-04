"use client";
import { SatisfactionOverTimeModel } from '@/models/dashboard/analytics';
import Link from 'next/link'
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Line, Tooltip, LineChart, Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent } from '../ui/card';
import { GRAPHS_COLORS } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface ChartSectionProps {
  satisfactionData: SatisfactionOverTimeModel[];
  productCount: number;
  serviceCount: number;
}

export default function ChartSection({
  satisfactionData,
  productCount,
  serviceCount,
}: ChartSectionProps) {
  return (
    <section className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <SatisfactionEvolutionGraph data={satisfactionData} />

        <ExperienceDistributionGraph
          productCount={productCount}
          serviceCount={serviceCount}
        />
      </div>

      <div className="flex justify-end">
        <Link
          href="/dashboard/analytics"
          className="flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          Ver análise completa
          <ChevronRight className="size-4" />

        </Link>
      </div>
    </section>
  );
}

interface SatisfactionEvolutionGraphProps {
  data: SatisfactionOverTimeModel[];
}

export function SatisfactionEvolutionGraph({
  data,
}: SatisfactionEvolutionGraphProps) {
  return (
    <Card className="rounded-2xl  bg-blue-100 py-0 shadow-md hover:-translate-y-1 hover:bg-blue-300 shadow-blue-700 border-none transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">
            Evolução da satisfação
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Veja como sua avaliação média mudou ao longo do tempo.
          </p>
        </div>

        {!data?.length ? (
          <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
            Ainda não há dados suficientes para exibir este gráfico.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 15,
                left: -10,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />

              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />

              <Tooltip content={<SatisfactionTooltip />} />

              <Line
                type="monotone"
                dataKey="averageRating"
                name="Avaliação média"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{
                  r: 4,
                  fill: "#ffffff",
                  strokeWidth: 2,
                }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

interface SatisfactionTooltipProps {
  active?: boolean;
  payload?: {
    value: number;
  }[];
  label?: string;
}

function SatisfactionTooltip({
  active,
  payload,
  label,
}: SatisfactionTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const rating = payload[0]?.value;

  return (
    <div className="rounded-lg border bg-white px-3 py-2 shadow-md">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-900">
        Avaliação média: {rating.toFixed(1).replace(".", ",")} ★
      </p>
    </div>
  );
}

interface ExperienceDistributionGraphProps {
  productCount: number;
  serviceCount: number;
}

export function ExperienceDistributionGraph({
  productCount,
  serviceCount,
}: ExperienceDistributionGraphProps) {
  const total = productCount + serviceCount;

  const data = [
    {
      name: "Produtos",
      value: productCount,
      color: GRAPHS_COLORS[2],
    },
    {
      name: "Serviços",
      value: serviceCount,
      color: GRAPHS_COLORS[3],
    },
  ];

  return (
    <Card className="rounded-2xl  bg-blue-100 py-0 shadow-md hover:-translate-y-1 hover:bg-blue-300 shadow-blue-700 border-none transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-3">
          <h2 className="text-base font-semibold text-slate-900">
            Suas experiências
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Distribuição entre produtos e serviços.
          </p>
        </div>

        {total === 0 ? (
          <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
            Nenhuma experiência registrada.
          </div>
        ) : (
          <>
            <div className="relative h-[190px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={78}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {data.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              {/* Conteúdo central */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-900">
                  {total}
                </span>

                <span className="text-xs text-muted-foreground">
                  experiências
                </span>
              </div>
            </div>

            <div className="mt-2 space-y-2">
              <DistributionLegend
                color="bg-blue-600"
                label="Produtos"
                value={productCount}
                total={total}
              />

              <DistributionLegend
                color="bg-violet-900"
                label="Serviços"
                value={serviceCount}
                total={total}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

interface DistributionLegendProps {
  color: string;
  label: string;
  value: number;
  total: number;
}

function DistributionLegend({
  color,
  label,
  value,
  total,
}: DistributionLegendProps) {
  const percentage = total > 0
    ? (value / total) * 100
    : 0;

  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <span
          className={`size-2.5 rounded-full ${color}`}
        />

        <span className="text-slate-700">
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-medium text-slate-900">
          {value}
        </span>

        <span className="w-12 text-right text-xs text-muted-foreground">
          {percentage.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}
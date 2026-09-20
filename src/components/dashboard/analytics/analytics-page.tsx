"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    AlertTriangle,
    Lightbulb,
    TrendingUp,
    Users,
} from "lucide-react";

import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/ui/choicelog-pages-title";
import { categorySpending, experiencesByCategory, satisfactionByCategory, buyAgainByCategory, influences, influenceSatisfaction, spendingSatisfaction } from "./analytics-mock";
import { AvaliacaoMediaMetricCard, BuyAgainMetricCard, ChartCard, InsightCard, MetricCard, MostLikedCategoryMetricCard, MostSpentCategoryMetricCard } from "./analytics-small-components";
import { AnalyticsDataModel } from "@/models/dashboard/analytics";


const COLORS = [
    "#3b82f6",
    "#fbbf24",
    "#22c55e",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

interface AnalyticsProps {
    data: AnalyticsDataModel
}
export default function AnalyticsPageComponent({ data }: AnalyticsProps) {
    return (
        <div className="mx-auto w-full max-w-[1600px] space-y-5 p-5 lg:p-6">

            <section className="space-y-3">

                <PageHeader header="Visão geral" textClassName="text-md" lineBefore />

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <AvaliacaoMediaMetricCard avg={data.overview.averageRating} />
                    < BuyAgainMetricCard avg={data.overview.repurchaseRate} />
                    < MostLikedCategoryMetricCard data={data.overview.bestRatedCategory} />
                    < MostSpentCategoryMetricCard data={data.overview.mostConsumedCategory} />
                </div>
            </section>

            {/* INSIGHTS */}

            <section className="space-y-3 pt-8">
                <div className="flex items-end justify-between">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <PageHeader header="Insights sobre suas escolhas" textClassName="text-md" lineBefore />
                        <p className="text-md text-muted-foreground">
                            Alguns padrões identificados a partir das suas experiências.
                        </p>
                    </div>

                    <span className="hidden text-xs text-muted-foreground sm:block">
                        Baseado em {data.overview.totalExperiences} experiências
                    </span>
                </div>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    <InsightCard
                        icon={<Lightbulb className="size-5 text-amber-500" />}
                        title="Pesquisa própria parece funcionar para você"
                    >
                        Experiências influenciadas por pesquisa própria tiveram avaliação
                        média de <strong>4,6</strong>, enquanto experiências associadas à
                        impulsividade tiveram média de <strong>3,1</strong>.
                    </InsightCard>

                    <InsightCard
                        icon={<AlertTriangle className="size-5 text-red-500" />}
                        title="Uma categoria merece atenção"
                    >
                        Roupas é a categoria com maior proporção de experiências que você
                        não consumiria novamente (<strong>40%</strong>).
                    </InsightCard>

                    <InsightCard
                        icon={<TrendingUp className="size-5 text-emerald-600" />}
                        title="Suas melhores experiências"
                    >
                        <strong>87%</strong> das experiências avaliadas com 4 ou 5 estrelas
                        são escolhas que você faria novamente.
                    </InsightCard>

                    <InsightCard
                        icon={<Users className="size-5 text-blue-600" />}
                        title="Suas influências mais confiáveis"
                    >
                        Experiências influenciadas por amigos e família têm avaliação média
                        de <strong>4,2</strong> e <strong>78%</strong> de recompra.
                    </InsightCard>
                </div>
            </section>

            {/* CHARTS ROW 1 */}

            <div className="grid gap-4 xl:grid-cols-2">
                <ChartCard
                    title="Gastos por categoria"
                    description="Veja onde o valor das suas experiências está concentrado."
                >
                    <ResponsiveContainer width="100%" height={270}>
                        <BarChart data={categorySpending}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="category" fontSize={12} />
                            <YAxis
                                fontSize={12}
                                tickFormatter={(value) => `R$ ${value}`}
                            />
                            <Tooltip
                                formatter={(value) => [
                                    `R$ ${Number(value).toLocaleString("pt-BR")}`,
                                    "Total",
                                ]}
                            />

                            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                {categorySpending.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard
                    title="Experiências por categoria"
                    description="Categorias que aparecem com maior frequência no seu histórico."
                >
                    <ResponsiveContainer width="100%" height={270}>
                        <BarChart data={experiencesByCategory}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="category" fontSize={12} />
                            <YAxis allowDecimals={false} fontSize={12} />
                            <Tooltip />

                            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                {experiencesByCategory.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* CHARTS ROW 2 */}

            <div className="grid gap-4 xl:grid-cols-2">
                <ChartCard
                    title="Satisfação por categoria"
                    description="Compare sua avaliação média entre diferentes categorias."
                >
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart
                            data={satisfactionByCategory}
                            layout="vertical"
                            margin={{ left: 30 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" domain={[0, 5]} />
                            <YAxis
                                dataKey="category"
                                type="category"
                                width={90}
                                fontSize={12}
                            />
                            <Tooltip />

                            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                                {satisfactionByCategory.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard
                    title="Consumiria novamente?"
                    description="Veja como sua intenção de repetir a experiência varia entre categorias."
                >
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart
                            data={buyAgainByCategory}
                            layout="vertical"
                            margin={{ left: 30 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis
                                type="number"
                                domain={[0, 100]}
                                tickFormatter={(value) => `${value}%`}
                            />
                            <YAxis
                                dataKey="category"
                                type="category"
                                width={90}
                                fontSize={12}
                            />

                            <Tooltip formatter={(value) => `${value}%`} />
                            <Legend />

                            <Bar
                                dataKey="yes"
                                name="Sim"
                                stackId="repurchase"
                                fill="#3b82f6"
                            />

                            <Bar
                                dataKey="no"
                                name="Não"
                                stackId="repurchase"
                                fill="#fbbf24"
                                radius={[0, 5, 5, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* INFLUENCES */}

            <div className="grid gap-4 xl:grid-cols-2">
                <ChartCard
                    title="O que influencia suas escolhas?"
                    description="Principais influências registradas nas suas experiências."
                >
                    <ResponsiveContainer width="100%" height={290}>
                        <BarChart data={influences}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="name"
                                fontSize={11}
                                interval={0}
                                height={50}
                            />
                            <YAxis tickFormatter={(value) => `${value}%`} />
                            <Tooltip formatter={(value) => `${value}%`} />

                            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                {influences.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard
                    title="Influência e satisfação"
                    description="Como cada influência se relaciona com suas experiências."
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50 text-left">
                                    <th className="px-3 py-3 font-medium">Influência</th>
                                    <th className="px-3 py-3 font-medium">Avaliação média</th>
                                    <th className="px-3 py-3 font-medium">Recompra</th>
                                </tr>
                            </thead>

                            <tbody>
                                {influenceSatisfaction.map((row) => (
                                    <tr key={row.influence} className="border-b last:border-0">
                                        <td className="px-3 py-3">{row.influence}</td>
                                        <td className="px-3 py-3 font-medium">
                                            {row.rating.toFixed(1).replace(".", ",")}
                                        </td>
                                        <td className="px-3 py-3 font-medium">
                                            {row.repurchase}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ChartCard>
            </div>

            {/* SCATTER */}

            <ChartCard
                title="Valor gasto × satisfação"
                description="Explore a relação entre quanto você gastou e como avaliou suas experiências."
            >
                <ResponsiveContainer width="100%" height={340}>
                    <ScatterChart margin={{ left: 10, right: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            type="number"
                            dataKey="price"
                            name="Valor"
                            unit=" R$"
                        />

                        <YAxis
                            type="number"
                            dataKey="rating"
                            name="Avaliação"
                            domain={[1, 5]}
                            ticks={[1, 2, 3, 4, 5]}
                        />

                        <Tooltip
                            cursor={{ strokeDasharray: "3 3" }}
                            formatter={(value, name) => {
                                if (name === "Valor") {
                                    return [`R$ ${value}`, name];
                                }

                                return [value, name];
                            }}
                        />

                        <Scatter
                            name="Experiências"
                            data={spendingSatisfaction}
                            fill="#3b82f6"
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </ChartCard>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   FILTER                                   */
/* -------------------------------------------------------------------------- */

interface FilterProps {
    label: string;
    defaultValue: string;
    children: React.ReactNode;
}

function Filter({ label, defaultValue, children }: FilterProps) {
    return (
        <div className="w-full lg:w-56">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                {label}
            </label>

            <Select defaultValue={defaultValue}>
                <SelectTrigger className="w-full">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>{children}</SelectContent>
            </Select>
        </div>
    );
}
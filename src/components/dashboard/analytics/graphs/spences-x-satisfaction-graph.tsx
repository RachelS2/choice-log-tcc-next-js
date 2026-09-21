"use client";
import {
    Bar,
    BarChart,
    CartesianGrid,

    ResponsiveContainer,

    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { ChartCard } from "../analytics-small-components";
import { SpendingSatisfactionByCategory } from "@/models/dashboard/analytics";
import { useState } from "react";


interface Props {
    data: SpendingSatisfactionByCategory[];
    colors: string[];
}

export default function SpencesXSatisfactionGraph({
    data, colors
}: Props) {
    if (!data?.length) return null;
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    return (
        <ChartCard
            title="Gastos por categoria"
            description="Veja como seus gastos estão distribuídos entre as categorias."
        >
            <ResponsiveContainer width="100%" height={340}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 10,
                        right: 30,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={false}
                    />

                    <XAxis
                        type="number"
                        dataKey="totalSpent"
                        tickFormatter={(value) =>
                            Number(value).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                                maximumFractionDigits: 0,
                            })
                        }
                    />

                    <YAxis
                        type="category"
                        dataKey="category"
                        width={130}
                    />

                    <Tooltip content={<CategoryTooltip />} />

                    <Bar
                        dataKey="totalSpent"
                        name="Total gasto"
                        shape={(props) => {
                            const index = data.findIndex(
                                (item) =>
                                    item.category === props.payload.category
                            );

                            return (
                                <CustomBarShape
                                    {...props}
                                    activeCategory={activeCategory}
                                    setActiveCategory={setActiveCategory}
                                    color={colors[index % colors.length]}
                                />
                            );
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}

interface CategoryTooltipProps {
    active?: boolean;
    payload?: {
        payload: SpendingSatisfactionByCategory;
    }[];
}

function CategoryTooltip({
    active,
    payload,
}: CategoryTooltipProps) {
    if (!active || !payload?.length) {
        return null;
    }

    const data = payload[0]?.payload;

    if (!data) {
        return null;
    }

    return (
        <div className="rounded-lg border bg-background p-3 shadow-sm">
            <p className="font-medium">
                {data.category}
            </p>

            <div className="mt-2 space-y-1 text-sm">
                <p>
                    Total gasto:{" "}
                    <span className="font-medium">
                        {data.totalSpent.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </span>
                </p>

                <p>
                    Avaliação média:{" "}
                    <span className="font-medium">
                        {data.averageRating
                            .toFixed(1)
                            .replace(".", ",")} ★
                    </span>
                </p>

                <p>
                    Experiências:{" "}
                    <span className="font-medium">
                        {data.experiences}
                    </span>
                </p>
            </div>
        </div>
    );
}

interface CustomBarShapeProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    payload?: SpendingSatisfactionByCategory;

    activeCategory: string | null;

    setActiveCategory: (
        category: string | null
    ) => void;

    color: string;
}

function CustomBarShape({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    payload,
    activeCategory,
    setActiveCategory,
    color,
}: CustomBarShapeProps) {
    if (!payload) return null;

    const isActive =
        payload.category === activeCategory;

    const handleMouseEnter = () => {
        setActiveCategory(payload.category);
    };

    const handleMouseLeave = () => {
        setActiveCategory(null);
    };

    if (!isActive) {
        return (
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx={4}
                fill={color}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer"
            />
        );
    }

    const yesWidth =
        width * (payload.wouldBuyAgain / 100);

    const noWidth =
        width * (payload.wouldNotBuyAgain / 100);

    return (
        <g
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer"
        >
            <rect
                x={x}
                y={y}
                width={yesWidth}
                height={height}
                fill="#22c55e"
            />

            <rect
                x={x + yesWidth}
                y={y}
                width={noWidth}
                height={height}
                fill="#ef4444"
            />

            {yesWidth > 45 && (
                <text
                    x={x + yesWidth / 2}
                    y={y + height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize={11}
                    fontWeight={500}
                    pointerEvents="none"
                >
                    {payload.wouldBuyAgain.toFixed(0)}%
                </text>
            )}

            {noWidth > 45 && (
                <text
                    x={x + yesWidth + noWidth / 2}
                    y={y + height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize={11}
                    fontWeight={500}
                    pointerEvents="none"
                >
                    {payload.wouldNotBuyAgain.toFixed(0)}%
                </text>
            )}
        </g>
    );
}
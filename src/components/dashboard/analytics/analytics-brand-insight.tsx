import { BrandEvaluationInsightModel, BrandEvaluationModel, BrandEvaluationResult } from "@/models/dashboard/analytics";
export default function BrandInsight({
    brandReview,
}: {
    brandReview: BrandEvaluationInsightModel | null;
}) {
    if (!brandReview) {
        return (
            <p>
                Ainda não há marcas suficientes para comparar suas avaliações.
            </p>
        );
    }

    return (
        <>
            <BestBrandResult bestBrandsReview={brandReview.best} />{" "}
            <WorstBrandResult worstBrandsReview={brandReview.worst} />
        </>
    )
}

function BestBrandResult({ bestBrandsReview }: { bestBrandsReview: BrandEvaluationResult }) {
    const bestBrands = bestBrandsReview.brands
    const bestBrandsNames: string = formatBrandNames(bestBrands);
    const message =
        bestBrandsReview.status === "TIE"
            ? "empataram como suas marcas mais bem avaliadas"
            : "é sua marca mais bem avaliada";

    return (
        <>
            <strong>{bestBrandsNames}</strong> {message}, com média de{" "}
            <strong>{bestBrands[0].averageRating.toFixed(1)} ★</strong> e{" "}
            <strong>{bestBrands[0].repurchaseRate.toFixed(0)}%</strong> de intenção
            de consumir novamente.
        </>
    )
}

function WorstBrandResult({ worstBrandsReview }: { worstBrandsReview: BrandEvaluationResult }) {
    const worstBrandsNames: string = formatBrandNames(worstBrandsReview.brands);
    const verb =
        worstBrandsReview.status === "TIE"
            ? "possuem"
            : "possui";

    return (
        <>
            Já <strong>{worstBrandsNames}</strong> {verb} sua
            menor avaliação média, de{" "}
            <strong>{worstBrandsReview.brands[0].averageRating.toFixed(1)} ★</strong>.
        </>
    )
}

function formatBrandNames(
    brands: BrandEvaluationModel[]
): string {
    const names = brands.map((brand) => brand.brand);

    if (names.length === 0) return "";

    if (names.length === 1) {
        return names[0];
    }

    if (names.length === 2) {
        return names.join(" e ");
    }

    return `${names.slice(0, -1).join(", ")} e ${names.at(-1)}`;
}
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/choicelog-pages-title";
import {
    BarChart3,
    Brain,
    GraduationCap,
    LockKeyhole,
    UserRound,
} from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <section className="mx-auto max-w-5xl px-6 py-20">
                <div className="mx-auto max-w-3xl pt-10 text-center">
                    <span className="text-sm font-medium font-semibold tracking-tight  text-slate-500">
                        SOBRE O CHOICELOG
                    </span>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-800 to-blue-500 text-transparent bg-clip-text">
                        Um projeto acadêmico sobre decisões de consumo
                    </h1>

                    <p className="mt-5 text-lg leading-relaxed text-slate-600">
                        O ChoiceLog foi desenvolvido em 2026 como Trabalho de Conclusão
                        de Curso de <strong>Rachel Barino Silva</strong>, sob orientação da professora
                        <strong> Rebeca Motta</strong>.
                    </p>

                    <p className="mt-3 text-lg leading-relaxed text-slate-600">
                        A plataforma foi criada para apoiar o <strong>registro e a análise</strong> de
                        experiências <strong>pessoais</strong> de consumo, incentivando a reflexão sobre
                        escolhas e a identificação de padrões ao longo do tempo.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-3">
                    <AboutCard
                        icon={UserRound}
                        title="Autoria"
                        description="Desenvolvido por Rachel Barino Silva como parte de seu Trabalho de Conclusão de Curso."
                    />

                    <AboutCard
                        icon={GraduationCap}
                        title="Orientação"
                        description="Projeto desenvolvido sob orientação da professora Rebeca Motta, em 2026."
                    />

                    <AboutCard
                        icon={Brain}
                        title="Propósito"
                        description="Promover autoconhecimento e apoiar decisões de consumo mais conscientes a partir das próprias experiências."
                    />
                </div>

                <div className="mt-12 rounded-2xl bg-blue-50 px-6 py-8 md:px-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-xl font-semibold text-slate-900">
                            Por que o ChoiceLog?
                        </h2>

                        <p className="mt-3 leading-relaxed text-slate-600">
                            Diferente de plataformas voltadas a avaliações públicas, o
                            ChoiceLog mantém o foco no próprio usuário. Os registros são
                            utilizados para acompanhar experiências, gastos, avaliações,
                            influências e outros aspectos das decisões de consumo.
                        </p>

                        <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="size-4 text-blue-600" />
                                Análise de padrões
                            </div>

                            <div className="flex items-center gap-2">
                                <Brain className="size-4 text-blue-600" />
                                Reflexão pessoal
                            </div>

                            <div className="flex items-center gap-2">
                                <LockKeyhole className="size-4 text-blue-600" />
                                Experiências privadas
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function AboutCard({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ElementType;
    title: string;
    description: string;
}) {
    return (
        <Card className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm  transition-all hover:-translate-y-0.5 shadow-blue-600 hover:shadow-lg hover:shadow-blue-700">
            <CardContent>
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50">
                    <Icon className="size-5 text-blue-600" />
                </div>

                <h2 className="mt-4 font-semibold text-base text-slate-900">{title}</h2>

                <p className="mt-2 text-md leading-relaxed text-slate-600">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}

//    <Card
//       key={title}
//       className="rounded-xl border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 shadow-blue-600 hover:shadow-lg hover:shadow-blue-700"
//     >
//       <CardContent className="p-6">
//         <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
//           <Icon className="h-5 w-5 text-blue-600" />
//         </div>
//         <h3 className="text-xl font-semibold text-neutral-950">
//           {title}
//         </h3>
//         <p className="mt-2 text-lg leading-relaxed text-neutral-600">
//           {description}
//         </p>
//       </CardContent>
//     </Card>
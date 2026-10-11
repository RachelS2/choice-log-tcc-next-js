import { PrismaPg } from "@prisma/adapter-pg";
import { ItemTypeEnum, PrismaClient } from "../generated/prisma";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Iniciando seed do ChoiceLog...");

  // 1. Tipos de itens
  const product = await prisma.itemType.upsert({
    where: { name: ItemTypeEnum.PRODUCT },
    update: {},
    create: { name: ItemTypeEnum.PRODUCT },
  });

  const service = await prisma.itemType.upsert({
    where: { name: ItemTypeEnum.SERVICE },
    update: {},
    create: { name: ItemTypeEnum.SERVICE },
  });

  // 2. Categorias
  const categories = [
    {
      typeId: service.id,
      name: "Cuidados Pessoais",
      description:
        "Serviços relacionados a cuidados pessoais, beleza, estética e bem-estar.",
    },
    {
      typeId: service.id,
      name: "Alimentação",
      description:
        "Experiências de alimentação e serviços de refeições oferecidos por restaurantes e estabelecimentos similares.",
    },
    {
      typeId: service.id,
      name: "Saúde",
      description:
        "Serviços relacionados à saúde, bem-estar e cuidados de saúde.",
    },
    {
      typeId: service.id,
      name: "Entretenimento",
      description:
        "Serviços digitais de streaming para entretenimento e consumo de mídia.",
    },
    {
      typeId: service.id,
      name: "Educação",
      description:
        "Serviços educacionais, cursos, aulas e atividades de aprendizagem.",
    },
    {
      typeId: service.id,
      name: "Turismo",
      description:
        "Serviços relacionados a viagens, turismo, hospedagem e lazer.",
    },
    { typeId: service.id, name: "Outros", description: null },
    { typeId: service.id, name: "Transporte", description: null },

    {
      typeId: product.id,
      name: "Eletrônicos",
      description:
        "Dispositivos eletrônicos, acessórios e produtos relacionados à tecnologia.",
    },
    {
      typeId: product.id,
      name: "Cuidados Pessoais",
      description:
        "Produtos relacionados à higiene pessoal, cuidados pessoais e autocuidado.",
    },
    {
      typeId: product.id,
      name: "Vestuário",
      description:
        "Roupas, calçados e produtos relacionados à moda.",
    },
    { typeId: product.id, name: "Outros", description: null },
    {
      typeId: product.id,
      name: "Casa",
      description:
        "Produtos utilizados para necessidades domésticas e relacionadas ao lar.",
    },
    {
      typeId: product.id,
      name: "Alimentação",
      description:
        "Alimentos, bebidas e outros produtos destinados ao consumo.",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        name_typeId: {
          name: category.name,
          typeId: category.typeId,
        },
      },
      update: {
        description: category.description,
      },
      create: category,
    });
  }

  // 3. Influências
  const influences = [
    "Redes sociais",
    "Amigos ou familiares",
    "Pesquisa própria",
    "Impulsividade",
    "Influência do vendedor",
    "Preço reduzido",
    "Outro",
    "Reputação da marca",
  ];

  for (const friendlyName of influences) {
    await prisma.consumptionInfluence.upsert({
      where: { friendlyName },
      update: {},
      create: { friendlyName },
    });
  }

  // 4. Motivos
  const reasons = [
    "Necessidade",
    "Teste de eficácia",
    "Satisfação pessoal",
    "Acompanhar tendências",
    "Outro",
  ];

  for (const friendlyName of reasons) {
    await prisma.consumptionReason.upsert({
      where: { friendlyName },
      update: {},
      create: { friendlyName },
    });
  }

  // 5. Aspectos negativos
  const negativeAspects = [
    // Produtos
    { typeId: product.id, friendlyName: "Item ineficaz" },
    { typeId: product.id, friendlyName: "Baixa qualidade" },
    { typeId: product.id, friendlyName: "Baixa durabilidade" },
    { typeId: product.id, friendlyName: "Design inadequado" },
    { typeId: product.id, friendlyName: "Inseguro para uso" },
    { typeId: product.id, friendlyName: "Outro" },

    // Serviços
    { typeId: service.id, friendlyName: "Serviço ineficaz" },
    { typeId: service.id, friendlyName: "Atendimento insatisfatório" },
    { typeId: service.id, friendlyName: "Baixa qualidade" },
    { typeId: service.id, friendlyName: "Localização ruim" },
    { typeId: service.id, friendlyName: "Ambiente desconfortável" },
    { typeId: service.id, friendlyName: "Embalagem inadequada" },
    { typeId: service.id, friendlyName: "Outro" },
  ];

  for (const aspect of negativeAspects) {
    await prisma.negativeAspect.upsert({
      where: {
        friendlyName_typeId: {
          friendlyName: aspect.friendlyName,
          typeId: aspect.typeId,
        },
      },
      update: {},
      create: aspect,
    });
  }

  console.log("Seed do ChoiceLog concluído com sucesso!");
}

main()
  .catch((error) => {
    console.error("Erro ao executar seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
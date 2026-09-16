
/* -------------------------------------------------------------------------- */
/*                                  MOCK DATA                                 */
/* -------------------------------------------------------------------------- */

export const categorySpending = [
    { category: "Eletrônicos", value: 1850 },
    { category: "Restaurantes", value: 920 },
    { category: "Roupas", value: 610 },
    { category: "Livros", value: 320 },
    { category: "Streaming", value: 180 },
];

export const experiencesByCategory = [
    { category: "Restaurantes", value: 14 },
    { category: "Livros", value: 9 },
    { category: "Roupas", value: 8 },
    { category: "Eletrônicos", value: 5 },
    { category: "Streaming", value: 4 },
];

export const satisfactionByCategory = [
    { category: "Restaurantes", value: 4.6 },
    { category: "Livros", value: 4.4 },
    { category: "Eletrônicos", value: 4.1 },
    { category: "Roupas", value: 3.5 },
    { category: "Delivery", value: 3.1 },
];

export const buyAgainByCategory = [
    { category: "Restaurantes", yes: 80, no: 20 },
    { category: "Livros", yes: 90, no: 10 },
    { category: "Roupas", yes: 60, no: 40 },
    { category: "Eletrônicos", yes: 70, no: 30 },
    { category: "Delivery", yes: 50, no: 50 },
];

export const influences = [
    { name: "Pesquisa própria", value: 32 },
    { name: "Amigos e família", value: 24 },
    { name: "Redes sociais", value: 18 },
    { name: "Custo reduzido", value: 15 },
    { name: "Impulsividade", value: 7 },
    { name: "Outros", value: 4 },
];

export const influenceSatisfaction = [
    { influence: "Pesquisa própria", rating: 4.6, repurchase: 87 },
    { influence: "Amigos e família", rating: 4.2, repurchase: 78 },
    { influence: "Reputação da marca", rating: 4.0, repurchase: 73 },
    { influence: "Redes sociais", rating: 3.5, repurchase: 56 },
    { influence: "Impulsividade", rating: 3.1, repurchase: 38 },
];

export const spendingSatisfaction = [
    { price: 45, rating: 3.1, category: "Roupas" },
    { price: 60, rating: 4.1, category: "Livros" },
    { price: 75, rating: 4.5, category: "Restaurantes" },
    { price: 95, rating: 3.4, category: "Streaming" },
    { price: 120, rating: 4.2, category: "Restaurantes" },
    { price: 140, rating: 2.8, category: "Roupas" },
    { price: 180, rating: 4.5, category: "Eletrônicos" },
    { price: 220, rating: 3.7, category: "Livros" },
    { price: 280, rating: 2.2, category: "Delivery" },
    { price: 350, rating: 4.1, category: "Restaurantes" },
    { price: 430, rating: 3.6, category: "Roupas" },
    { price: 520, rating: 4.3, category: "Eletrônicos" },
    { price: 650, rating: 3.8, category: "Eletrônicos" },
    { price: 820, rating: 4.6, category: "Eletrônicos" },
    { price: 980, rating: 3.9, category: "Eletrônicos" },
];
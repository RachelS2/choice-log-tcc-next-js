INSERT INTO "Category"
("name", "typeId", "id", "description")
VALUES

-- PRODUCT

(
    'Eletrônicos',
    (SELECT id FROM "ItemType" WHERE name = 'PRODUCT'),
    gen_random_uuid(),
    'Dispositivos eletrônicos, acessórios e produtos relacionados à tecnologia.'
),

(
    'Vestuário',
    (SELECT id FROM "ItemType" WHERE name = 'PRODUCT'),
    gen_random_uuid(),
    'Roupas, calçados e produtos relacionados à moda.'
),

(
    'Alimentação',
    (SELECT id FROM "ItemType" WHERE name = 'PRODUCT'),
    gen_random_uuid(),
    'Alimentos, bebidas e outros produtos destinados ao consumo.'
),

(
    'Higiene e Cuidados Pessoais',
    (SELECT id FROM "ItemType" WHERE name = 'PRODUCT'),
    gen_random_uuid(),
    'Produtos relacionados à higiene pessoal, cuidados pessoais e autocuidado.'
),

(
    'Casa',
    (SELECT id FROM "ItemType" WHERE name = 'PRODUCT'),
    gen_random_uuid(),
    'Produtos utilizados para necessidades domésticas e relacionadas ao lar.'
),

-- SERVICE

(
    'Streaming',
    (SELECT id FROM "ItemType" WHERE name = 'SERVICE'),
    gen_random_uuid(),
    'Serviços digitais de streaming para entretenimento e consumo de mídia.'
),

(
    'Cuidados Pessoais',
    (SELECT id FROM "ItemType" WHERE name = 'SERVICE'),
    gen_random_uuid(),
    'Serviços relacionados a cuidados pessoais, beleza, estética e bem-estar.'
),

(
    'Turismo',
    (SELECT id FROM "ItemType" WHERE name = 'SERVICE'),
    gen_random_uuid(),
    'Serviços relacionados a viagens, turismo, hospedagem e lazer.'
),

(
    'Restaurantes',
    (SELECT id FROM "ItemType" WHERE name = 'SERVICE'),
    gen_random_uuid(),
    'Experiências de alimentação e serviços de refeições oferecidos por restaurantes e estabelecimentos similares.'
),

(
    'Educação',
    (SELECT id FROM "ItemType" WHERE name = 'SERVICE'),
    gen_random_uuid(),
    'Serviços educacionais, cursos, aulas e atividades de aprendizagem.'
),

(
    'Saúde',
    (SELECT id FROM "ItemType" WHERE name = 'SERVICE'),
    gen_random_uuid(),
    'Serviços relacionados à saúde, bem-estar e cuidados de saúde.'
);
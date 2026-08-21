INSERT INTO "ConsumptionReason"
("friendlyName","systemName","typeId","createdAt","updatedAt")
VALUES

-- PRODUCT
('Necessidade','NECESSITY',
 (SELECT id FROM "ItemType" WHERE name='PRODUCT'),
 NOW(),NOW()),

('Teste de eficácia','EFFECTIVENESS_TEST',
 (SELECT id FROM "ItemType" WHERE name='PRODUCT'),
 NOW(),NOW()),

('Satisfação pessoal','PERSONAL_SATISFACTION',
 (SELECT id FROM "ItemType" WHERE name='PRODUCT'),
 NOW(),NOW()),

('Alinhamento social','SOCIAL_ALIGNMENT',
 (SELECT id FROM "ItemType" WHERE name='PRODUCT'),
 NOW(),NOW()),

('Outro','OTHER',
 (SELECT id FROM "ItemType" WHERE name='PRODUCT'),
 NOW(),NOW()),

-- SERVICE
('Necessidade','NECESSITY',
 (SELECT id FROM "ItemType" WHERE name='SERVICE'),
 NOW(),NOW()),

('Satisfação pessoal','PERSONAL_SATISFACTION',
 (SELECT id FROM "ItemType" WHERE name='SERVICE'),
 NOW(),NOW()),

('Alinhamento social','SOCIAL_ALIGNMENT',
 (SELECT id FROM "ItemType" WHERE name='SERVICE'),
 NOW(),NOW()),

('Lazer','LEISURE',
 (SELECT id FROM "ItemType" WHERE name='SERVICE'),
 NOW(),NOW()),

('Outro','OTHER',
 (SELECT id FROM "ItemType" WHERE name='SERVICE'),
 NOW(),NOW());
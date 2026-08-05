
 --9. Cria indexes na tabela Category
-- CATEGORIAS DO USUÁRIO:
CREATE UNIQUE INDEX unique_user_category
ON "Category" ("name", "userId")
WHERE "userId" IS NOT NULL;

 categorias globais
CREATE UNIQUE INDEX unique_global_category
ON "Category" ("name")
WHERE "userId" IS NULL;

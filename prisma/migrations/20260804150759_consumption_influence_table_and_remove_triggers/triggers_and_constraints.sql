--TODO: Prisma não dá suporte para constraints, então executar no banco mais tarde:

-- 1. Constraint de Nota em incrementos de 5 (0, 0.5, 1, 1.5...)
ALTER TABLE "Consumption"
ADD CONSTRAINT rating_range
CHECK (
  rating IS NULL
  OR (
    rating >= 1
    AND rating <= 5
    AND MOD(rating * 2, 1) = 0
  )
);


-- 3. Adicionar trigger para que ID do usuário de Consumption seja igual ao ID do usuário do Item.
CREATE OR REPLACE FUNCTION validate_consumption_user()
RETURNS trigger AS $$
BEGIN
IF NEW."userId" <> (
SELECT "userId" FROM "Item" WHERE id = NEW."itemId"
) THEN
RAISE EXCEPTION 'Consumption userId must match Item userId';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_consumption_user
BEFORE INSERT OR UPDATE ON "Consumption"
FOR EACH ROW
EXECUTE FUNCTION validate_consumption_user();

-- 5. Adiciona constraint na tabela ImpulsivityGoal 
ALTER TABLE "ImpulsivityGoal"
ADD CONSTRAINT impulsivity_goal_target_decrease_check
CHECK ("targetDecreasePercentage" BETWEEN 1 AND 100);

-- 6. Adiciona constraint na tabela SatisfactionGoal 
ALTER TABLE "SatisfactionGoal"
ADD CONSTRAINT satisfaction_goal_target_rating_check
CHECK ("targetRating" BETWEEN 1 AND 5)

 --7. A data final não pode ser anterior à inicial
 ALTER TABLE "Goal"
 ADD CONSTRAINT goal_dates_check
 CHECK (
   "finalDate" IS NULL
   OR "finalDate" >= "initialDate"
 );

 --8. Garantir que preço seja maior que 0
 ALTER TABLE "Consumption"
 ADD CONSTRAINT consumption_price_check
 CHECK ("price" > 0);

 --9. Cria indexes na tabela Category
-- CATEGORIAS DO USUÁRIO:
CREATE UNIQUE INDEX unique_user_category
ON "Category" ("systemName", "userId")
WHERE "userId" IS NOT NULL;

 categorias globais
CREATE UNIQUE INDEX unique_global_category
ON "Category" ("systemName")
WHERE "userId" IS NULL;

 --10. Garantir que ConsumptionReason
 --pertença ao mesmo ItemType do Item associado ao Consumption.
 --Como Item não possui typeId diretamente, o ItemType é obtido
 --através da relação Item → Category → ItemType.

 CREATE OR REPLACE FUNCTION validate_consumption_reason_type()
 RETURNS trigger AS $$
 DECLARE
     item_type_id UUID;
     reason_type_id UUID;
 BEGIN

     SELECT c."typeId"
     INTO item_type_id
     FROM "Item" i
     JOIN "Category" c
       ON c."id" = i."categoryId"
     WHERE i."id" = NEW."itemId";

    SELECT "typeId"
    INTO reason_type_id
    FROM "ConsumptionReason"
    WHERE "id" = NEW."reasonId";

    IF item_type_id IS NULL THEN
        RAISE EXCEPTION 'Item % not found.', NEW."itemId";
    END IF;

    IF reason_type_id IS NULL THEN
        RAISE EXCEPTION 'ConsumptionReason % not found.', NEW."reasonId";
    END IF;

    IF item_type_id <> reason_type_id THEN
        RAISE EXCEPTION
            'ConsumptionReason must belong to the same ItemType as the consumed Item.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_consumption_reason_type
BEFORE INSERT OR UPDATE
ON "Consumption"
FOR EACH ROW
EXECUTE FUNCTION validate_consumption_reason_type();

-- 11. Garantir que o NegativeAspect pertença ao mesmo ItemType do Item

CREATE OR REPLACE FUNCTION validate_negative_aspect_type()
RETURNS trigger AS $$
DECLARE
    item_type_id UUID;
    aspect_type_id UUID;
BEGIN

   SELECT c."typeId"
    INTO item_type_id
    FROM "Consumption" co
   JOIN "Item" i
        ON i."id" = co."itemId"
    JOIN "Category" c
        ON c."id" = i."categoryId"
    WHERE co."id" = NEW."consumptionId";

    SELECT "typeId"
    INTO aspect_type_id
    FROM "NegativeAspect"
    WHERE "id" = NEW."negativeAspectId";

    IF item_type_id IS NULL THEN
        RAISE EXCEPTION 'Consumption % not found.', NEW."consumptionId";
    END IF;

    IF aspect_type_id IS NULL THEN
        RAISE EXCEPTION 'NegativeAspect % not found.', NEW."negativeAspectId";
    END IF;

    IF item_type_id <> aspect_type_id THEN
        RAISE EXCEPTION
            'NegativeAspect must belong to the same ItemType as the consumed Item.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_negative_aspect_type
BEFORE INSERT OR UPDATE
ON "Consumption"
FOR EACH ROW
EXECUTE FUNCTION validate_negative_aspect_type();

 --12. Mínimo de gastos na tabela SpendingGoal
 ALTER TABLE "SpendingGoal"
 ADD CONSTRAINT spending_goal_limit_check
 CHECK ("spendingLimit" > 0);

 CREATE OR REPLACE FUNCTION validate_item_category_owner()
 RETURNS trigger AS $$
 DECLARE
    category_user_id TEXT;
 BEGIN

    SELECT "userId"
    INTO category_user_id
    FROM "Category"
    WHERE id = NEW."categoryId";

    IF category_user_id IS NOT NULL
       AND category_user_id <> NEW."userId" THEN

        RAISE EXCEPTION
        'Item can only use categories owned by the same user or global categories.';

    END IF;

    RETURN NEW;
 END;
   $$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_item_category_owner
BEFORE INSERT OR UPDATE
ON "Item"
FOR EACH ROW
EXECUTE FUNCTION validate_item_category_owner();
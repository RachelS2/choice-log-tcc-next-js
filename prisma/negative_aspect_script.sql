DO $$

DECLARE 
    typeIdProduct integer;
    typeIdService integer;

BEGIN

    typeIdProduct = (
        SELECT id
        FROM "ItemType"
        WHERE name = 'PRODUCT'
    );

    typeIdService = (
        SELECT id
        FROM "ItemType"
        WHERE name = 'SERVICE'
    );

    INSERT INTO "NegativeAspect"
    ("friendlyName", "systemName", "typeId", "createdAt", "updatedAt")
    VALUES

    -- PRODUTO

    (
        'Item foi ineficaz',
        'INEFFECTIVE',
        typeIdProduct,
        NOW(), NOW()
    ),

    (
        'Baixa qualidade',
        'LOW_QUALITY',
        typeIdProduct,
        NOW(), NOW()
    ),

    (
        'Baixa durabilidade',
        'LOW_DURABILITY',
        typeIdProduct,
        NOW(), NOW()
    ),

    (
        'Design ou embalagem inadequados',
        'POOR_DESIGN',
        typeIdProduct,
        NOW(), NOW()
    ),

    (
        'Inseguro para uso',
        'UNSAFE',
        typeIdProduct,
        NOW(), NOW()
    ),

    (
        'Outro',
        'OTHER',
        typeIdProduct,
        NOW(), NOW()
    ),

    -- SERVIÇO

    (
        'Atendimento ao cliente insatisfatório',
        'POOR_CUSTOMER_SERVICE',
        typeIdService,
        NOW(), NOW()
    ),

    (
        'Baixa qualidade',
        'LOW_QUALITY',
        typeIdService,
        NOW(), NOW()
    ),

    (
        'Serviço ineficaz',
        'INEFFECTIVE',
        typeIdService,
        NOW(), NOW()
    ),

    (
        'Outro',
        'OTHER',
        typeIdService,
        NOW(), NOW()
    );

END $$;
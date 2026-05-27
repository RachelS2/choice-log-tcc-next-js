type EnumLike = Record<string, string>;

export function createEnumHelpers<T extends EnumLike>(
    enumObj: T,
    labelsMap: Record<T[keyof T], string>
) {
    const values = Object.values(enumObj) as T[keyof T][];

    const options = values.map((value) => ({
        value,
        label: labelsMap[value],
    }));


    const labels = values.map((value) => labelsMap[value]);

    const getLabel = (value: T[keyof T]) => labelsMap[value];

    return {
        values,
        options,
        labels,
        getLabel,
    };
}